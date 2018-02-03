export default function smartConfig(defaultValue) {
  const cacheEntry = {};

  return {
    get(key) {
      return cacheEntry.hasOwnProperty(key) ? cacheEntry[key] : defaultValue;
    },
    set(key, value) {
      cacheEntry[key] = value;
    },
  };
}
