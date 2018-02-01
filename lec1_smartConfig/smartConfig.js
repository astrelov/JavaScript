export default function smartConfig(defaultValue) {
  const cacheEntry = {};

  return {
    get(key) {
      return cacheEntry[key] !== undefined ? cacheEntry[key] : defaultValue;
    },
    set(key, value) {
      cacheEntry[key] = value;
    },
  };
}

const config = smartConfig('default value');
for (let i = -5; i < 5; i += 1) config.set(i, i);

for (let i = -6; i < 6; i += 1) console.log(config.get(i));

// console.log(config.get('non_existing_key'));
