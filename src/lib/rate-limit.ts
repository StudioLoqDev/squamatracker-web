// In-memory rate limiter for server actions
// Note: For multi-instance production deployments, use Upstash Redis instead
const store = new Map<string, { count: number; resetAt: number }>();

export function isRateLimited(
  ip: string,
  action: string,
  limit = 5,
  windowMs = 60_000
): boolean {
  const key = `${action}:${ip}`;
  const now = Date.now();
  const entry = store.get(key);
  if (!entry || entry.resetAt < now) {
    store.set(key, { count: 1, resetAt: now + windowMs });
    // Prevent unbounded growth
    if (store.size > 10_000) {
      for (const [k, v] of store) { if (v.resetAt < now) store.delete(k); }
    }
    return false;
  }
  if (entry.count >= limit) return true;
  entry.count++;
  return false;
}
