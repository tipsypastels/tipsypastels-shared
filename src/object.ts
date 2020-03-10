export function mapObject<T extends {}, R>(obj: T, callback: (k: keyof T, v: T[keyof T], i: number, collection: T) => R): R[] {
  const keys = Object.keys(obj) as (keyof T)[];
  return keys.map((key, i) => {
    return callback(key, obj[key], i, obj);
  }); 
}