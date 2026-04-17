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
}

export const roiCache = new SimpleCache(3600000); // 1 hour
