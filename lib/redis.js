import { Redis } from "@upstash/redis";

// Reads UPSTASH_REDIS_REST_URL and UPSTASH_REDIS_REST_TOKEN from env automatically
export const redis = Redis.fromEnv();

export const EVENTS_KEY = "whatsapp:events";
export const MAX_STORED_EVENTS = 200;