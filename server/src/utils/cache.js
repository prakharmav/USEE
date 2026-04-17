import crypto from 'crypto';

/**
 * Simple in-memory cache with TTL (Time To Live)
 */
class SimpleCache {
  constructor(defaultTTL = 3600000) { // 1 hour by default
    this.cache = new Map();
    this.defaultTTL = defaultTTL;
  }

  set(key, value, ttl = this.defaultTTL) {
    const expiry = Date.now() + ttl;
    this.cache.set(key, { value, expiry });
  }

  get(key) {
    const data = this.cache.get(key);
    if (!data) return null;

    if (Date.now() > data.expiry) {
      this.cache.delete(key);
      return null;
    }

    return data.value;
  }

  delete(key) {
    this.cache.delete(key);
  }

  clear() {
    this.cache.clear();
  }

  size() {
    return this.cache.size;
  }
}

export const roiCache = new SimpleCache(3600000); // 1 hour TTL

// ── AI prompt-response cache — 5 min TTL ──────────────────────────────────────
export const aiCache = new SimpleCache(5 * 60 * 1000); // 5 minutes

/**
 * Creates a deterministic SHA-256 hash of any serialisable input.
 * Use this to build cache keys for AI requests so identical inputs
 * always resolve to the same key.
 *
 * @param {*} input - Any JSON-serialisable value.
 * @returns {string} 12-character hex prefix (low collision risk for small caches).
 */
export const hashKey = (input) =>
  crypto
    .createHash('sha256')
    .update(JSON.stringify(input))
    .digest('hex')
    .slice(0, 24);
