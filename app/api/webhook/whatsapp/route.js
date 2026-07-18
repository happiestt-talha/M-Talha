import { NextResponse } from "next/server";
import { randomUUID } from "crypto";
import { redis, EVENTS_KEY, MAX_STORED_EVENTS } from "@/lib/redis";

const VERIFY_TOKEN = process.env.WHATSAPP_VERIFY_TOKEN;

// --- GET: Meta's one-time verification handshake ---
export async function GET(req) {
    const searchParams = req.nextUrl.searchParams;
    const mode = searchParams.get("hub.mode");
    const token = searchParams.get("hub.verify_token");
    const challenge = searchParams.get("hub.challenge");

    if (mode === "subscribe" && token === VERIFY_TOKEN) {
        return new NextResponse(challenge, { status: 200 });
    }

    return new NextResponse("Forbidden", { status: 403 });
}

// --- POST: real incoming events (messages + status updates) ---
export async function POST(req) {
    let body;

    try {
        body = await req.json();
    } catch {
        // Meta occasionally sends empty/malformed pings — don't 500, just ack
        return new NextResponse("OK", { status: 200 });
    }

    try {
        const events = parseEvents(body);
        if (events.length > 0) {
            await storeEvents(events);
        }
    } catch (err) {
        // Log for your own visibility, but ALWAYS return 200 to Meta.
        // Returning an error status causes Meta to retry and can eventually
        // pause your subscription if failures persist.
        console.error("Failed to process WhatsApp webhook payload:", err);
    }

    return new NextResponse("OK", { status: 200 });
}

// Parses Meta's nested entry[].changes[].value structure into flat events
function parseEvents(body) {
    const events = [];

    const entries = body?.entry;
    if (!Array.isArray(entries)) return events;

    for (const entry of entries) {
        const changes = entry?.changes;
        if (!Array.isArray(changes)) continue;

        for (const change of changes) {
            const value = change?.value;
            if (!value) continue;

            // Incoming messages
            if (Array.isArray(value.messages)) {
                for (const message of value.messages) {
                    events.push({
                        id: randomUUID(),
                        receivedAt: new Date().toISOString(),
                        kind: "message",
                        from: message?.from,
                        messageType: message?.type,
                        text:
                            message?.type === "text" ? message?.text?.body : undefined,
                        raw: message,
                    });
                }
            }

            // Delivery / read status updates
            if (Array.isArray(value.statuses)) {
                for (const status of value.statuses) {
                    events.push({
                        id: randomUUID(),
                        receivedAt: new Date().toISOString(),
                        kind: "status",
                        statusId: status?.id,
                        statusValue: status?.status,
                        raw: status,
                    });
                }
            }
        }
    }

    // Fallback: unrecognized shape, still capture it so nothing silently vanishes
    if (events.length === 0) {
        events.push({
            id: randomUUID(),
            receivedAt: new Date().toISOString(),
            kind: "unknown",
            raw: body,
        });
    }

    return events;
}

async function storeEvents(events) {
    const pipeline = redis.pipeline();
    for (const event of events) {
        pipeline.lpush(EVENTS_KEY, JSON.stringify(event));
    }
    // Keep only the most recent MAX_STORED_EVENTS to avoid unbounded growth
    pipeline.ltrim(EVENTS_KEY, 0, MAX_STORED_EVENTS - 1);
    await pipeline.exec();
}