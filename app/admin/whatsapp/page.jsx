import { redis, EVENTS_KEY } from "@/lib/redis";

export const dynamic = "force-dynamic"; // always fetch fresh, never cache

async function getEvents() {
    const raw = await redis.lrange(EVENTS_KEY, 0, -1);
    return raw
        .map((item) => {
            try {
                return typeof item === "string" ? JSON.parse(item) : item;
            } catch {
                return null;
            }
        })
        .filter((e) => e !== null);
}

function formatTime(iso) {
    const d = new Date(iso);
    return d.toLocaleString("en-US", {
        month: "short",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
    });
}

const kindStyles = {
    message: "border-l-4 border-l-emerald-500",
    status: "border-l-4 border-l-slate-400",
    unknown: "border-l-4 border-l-amber-500",
};

export default async function WhatsAppAdminPage({ searchParams }) {
    const { token } = await searchParams;
    const expected = process.env.ADMIN_DASHBOARD_TOKEN;

    if (!expected || token !== expected) {
        return (
            <main className="min-h-screen flex items-center justify-center bg-neutral-950 text-neutral-200 px-6">
                <div className="max-w-sm text-center space-y-2">
                    <p className="text-sm uppercase tracking-widest text-neutral-500">
                        Restricted
                    </p>
                    <h1 className="text-lg font-medium">
                        Add <code className="text-neutral-400">?token=…</code> to the URL
                        to view this page.
                    </h1>
                </div>
            </main>
        );
    }

    const events = await getEvents();

    return (
        <main className="min-h-screen bg-neutral-950 text-neutral-200 px-6 py-10">
            <div className="max-w-2xl mx-auto space-y-6">
                <header className="flex items-baseline justify-between">
                    <h1 className="text-xl font-semibold tracking-tight">
                        WhatsApp Events
                    </h1>
                    <span className="text-xs text-neutral-500">
                        {events.length} stored
                    </span>
                </header>

                {events.length === 0 ? (
                    <p className="text-sm text-neutral-500 border border-neutral-800 rounded-lg px-4 py-8 text-center">
                        No events received yet. Send a test message to your WhatsApp
                        number to see it appear here.
                    </p>
                ) : (
                    <ul className="space-y-2">
                        {events.map((event) => (
                            <li
                                key={event.id}
                                className={`bg-neutral-900 rounded-md px-4 py-3 ${kindStyles[event.kind]}`}
                            >
                                <div className="flex items-center justify-between text-xs text-neutral-500 mb-1">
                                    <span className="uppercase tracking-wide">
                                        {event.kind}
                                    </span>
                                    <span>{formatTime(event.receivedAt)}</span>
                                </div>

                                {event.kind === "message" && (
                                    <div className="text-sm">
                                        <span className="text-neutral-400">
                                            {event.from ?? "unknown"}
                                        </span>
                                        {event.text && (
                                            <p className="mt-1 text-neutral-100">{event.text}</p>
                                        )}
                                        {!event.text && event.messageType && (
                                            <p className="mt-1 text-neutral-500 italic">
                                                [{event.messageType} message]
                                            </p>
                                        )}
                                    </div>
                                )}

                                {event.kind === "status" && (
                                    <p className="text-sm text-neutral-400">
                                        message {event.statusId} → {event.statusValue}
                                    </p>
                                )}

                                {event.kind === "unknown" && (
                                    <pre className="text-xs text-neutral-500 overflow-x-auto mt-1">
                                        {JSON.stringify(event.raw, null, 2)}
                                    </pre>
                                )}
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </main>
    );
}