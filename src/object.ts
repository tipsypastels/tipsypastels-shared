/**
 * Map over the keys of an object and pass the key, value, index, and collection to the map callback. Returns an array.
 * @param obj The object to iterate over.
 * @param callback Mapping callback.
 */
export function mapObject<T extends {}, R>(obj: T, callback: (k: keyof T, v: T[keyof T], i: number, collection: T) => R): R[] {
  const keys = Object.keys(obj) as (keyof T)[];
  return keys.map((key, i) => {
    return callback(key, obj[key], i, obj);
  }); 
}

/**
 * Omit properties from an object.
 */
export function omitKeys<
  T extends {}, 
  K extends keyof T
>(obj: T, keys: K[]): Omit<T, K> {
  const res = { ...obj } as Omit<T, K>;
  for (let key of keys) {
    // @ts-ignore
    delete res[key];
  }
  return res;
}