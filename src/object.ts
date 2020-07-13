import { underScore, camelCase } from "./string";

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

export function transformKeys<
  T extends object, 
  R extends string | number, 
>(obj: T, callback: (k: keyof T) => R): Record<R, T[keyof T]> {
  const res = {} as Record<R, T[keyof T]>;
  for (let key in obj) {
    res[callback(key)] = obj[key];
  }

  return res;
}

export function transformValues<
  T extends object,
  R
>(obj: T, callback: (v: T[keyof T]) => R): Record<keyof T, R> {
  const res = {} as Record<keyof T, R>;
  for (let key in obj) {
    res[key] = callback(obj[key]);
  }

  return res;
}

export function underScoreKeys<T extends object>(obj: T) {
  return transformKeys(obj, k => underScore(k.toString()))
}

export function camelCaseKeys<T extends object>(obj: T) {
  return transformKeys(obj, k => camelCase(k.toString()));
}

/**
 * Returns a type with only one of the keys allowed at a time.
 * 
 *     XorKeys<{ a: string, b: string }>
 * 
 * Matches an object with either `a` OR `b`, but not both.
 */
export type XorKeys<O extends {}> = {
  [K in keyof O]: (
    & Record<K, O[K]>
    & Partial<Record<Exclude<keyof O, K>, never>>
  )
}[keyof O];

/**
 * Returns a type that may be the original, `null`, or `undefined`.
 * If the type argument is an object, the same applies to all its properties.
 */
export type Nullish<T> = T extends {}
  ? (null | undefined | { [K in keyof T]?: Nullish<T[K]> })
  : (null | undefined | T)