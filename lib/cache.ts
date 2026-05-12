// 简单的内存缓存工具
// 用于缓存飞书 API 响应

interface CacheItem<T> {
  data: T;
  expireAt: number;
}

const cache = new Map<string, CacheItem<any>>();

/**
 * 获取缓存
 */
export function getCache<T>(key: string): T | undefined {
  const item = cache.get(key);
  
  if (!item) return undefined;
  
  if (Date.now() > item.expireAt) {
    cache.delete(key);
    return undefined;
  }
  
  return item.data as T;
}

/**
 * 设置缓存
 */
export function setCache<T>(key: string, data: T, ttlSeconds: number = 300): void {
  cache.set(key, {
    data,
    expireAt: Date.now() + ttlSeconds * 1000,
  });
}

/**
 * 删除缓存
 */
export function deleteCache(key: string): void {
  cache.delete(key);
}

/**
 * 清除所有缓存
 */
export function clearCache(): void {
  cache.clear();
}

/**
 * 生成缓存键
 */
export function makeCacheKey(...parts: (string | number)[]): string {
  return parts.join(':');
}
