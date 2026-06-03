import { Redis } from '@upstash/redis';

// Returns null when Upstash env vars are absent so the view counter degrades
// gracefully (the feature is non-critical and must never break the page).
let client: Redis | null = null;

export const getRedis = (): Redis | null => {
    if (client) return client;
    const url = process.env.UPSTASH_REDIS_REST_URL;
    const token = process.env.UPSTASH_REDIS_REST_TOKEN;
    if (!url || !token) return null;
    client = new Redis({ url, token });
    return client;
};
