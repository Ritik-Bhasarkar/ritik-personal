import { cookies, headers } from 'next/headers';
import { getRedis } from '@/lib/redis';

const VIEWS_KEY = 'views:unique';
const VISITOR_COOKIE = 'rb_visitor';
const ONE_YEAR = 60 * 60 * 24 * 365;
const BOT = /bot|crawl|spider|slurp|bingpreview|facebookexternalhit|embedly|quora|pinterest|whatsapp|telegram|preview|headless|lighthouse/i;

// POST increments the unique-visitor count the first time a browser is seen
// (guarded by a year-long first-party cookie) and always returns the total.
export async function POST(): Promise<Response> {
    const redis = getRedis();
    if (!redis) return Response.json({ count: null });

    const cookieStore = await cookies();
    const headerStore = await headers();
    const ua = headerStore.get('user-agent') ?? '';

    // returning visitor or a bot — read, never increment
    if (cookieStore.get(VISITOR_COOKIE) || BOT.test(ua)) {
        const count = (await redis.get<number>(VIEWS_KEY)) ?? 0;
        return Response.json({ count });
    }

    const count = await redis.incr(VIEWS_KEY);
    cookieStore.set(VISITOR_COOKIE, '1', {
        maxAge: ONE_YEAR,
        httpOnly: true,
        sameSite: 'lax',
        path: '/',
        secure: process.env.NODE_ENV === 'production',
    });
    return Response.json({ count });
}
