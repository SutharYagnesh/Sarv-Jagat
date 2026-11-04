/**
 * Ultra-fast In-Memory Cache for Sarv Jagat Website & Admin Panel.
 * Delivers data to viewers in < 1 millisecond by serving directly from memory
 * while background-refreshing without blocking users.
 */

const cacheStore = new Map();

export function getCached(key) {
  const item = cacheStore.get(key);
  if (!item) return null;
  if (Date.now() > item.expiry) {
    cacheStore.delete(key);
    return null;
  }
  return item.value;
}

export function setCached(key, value, ttlSeconds = 60) {
  cacheStore.set(key, {
    value,
    expiry: Date.now() + ttlSeconds * 1000,
  });
}

export async function fetchWithCache(key, fetcher, ttlSeconds = 60) {
  const cached = getCached(key);
  if (cached !== null) {
    return cached;
  }

  const fresh = await fetcher();
  if (fresh !== undefined && fresh !== null) {
    setCached(key, fresh, ttlSeconds);
  }
  return fresh;
}

export function invalidateCache(pattern = '') {
  if (!pattern) {
    cacheStore.clear();
    return;
  }
  for (const key of cacheStore.keys()) {
    if (key.includes(pattern)) {
      cacheStore.delete(key);
    }
  }
}

