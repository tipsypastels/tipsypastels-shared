export interface RangeOptions<T = number> {
  exclusive?: boolean;
}

export type RangeCallback<T> = (num: number) => T;

// typescript is hard
export function Range<T = number>(min: number, max: number): T[];
export function Range<T = number>(min: number, max: number, callback: RangeCallback<T>, opts?: RangeOptions<T>): T[];
export function Range<T = number>(min: number, max: number, opts: RangeOptions<T>, callback?: RangeCallback<T>): T[];
export function Range<T = number>(min: any, max: any, callbackOrOpts?: any, optsOrCallback?: any): T[] {
  const ary = [];

  let callback, opts;

  if (typeof callbackOrOpts === 'function') {
    callback = callbackOrOpts;
    opts = optsOrCallback || {};
  } else {
    callback = optsOrCallback;
    opts = callbackOrOpts || {};
  }

  for (let i = min; opts.exclusive ? i < max : i <= max; i++) {
    if (callback) {
      ary.push(callback(i));
    } else {
      ary.push(i);
    }
  }

  return ary;
}

export function partition<T>(ary: T[], partition: number) {
  return partitionThenMap(ary, partition, x => x);
}

export function partitionThenMap<T, R = T>(ary: T[], partition: number, callback: (current: T[], key: number) => R): R[] {
  const result: R[] = [];

  for (let i = 0; i < Math.ceil(ary.length / partition); i++) {
    const slice = ary.slice(i * partition, i * partition + partition);
    result.push(callback(slice, result.length));
  }

  return result;
}

export function uniqueBy<T, R>(ary: T[], callback: (item: T) => R): T[] {
  const results = new Map<R, T>();

  // using a map is probably faster than searching an array each loop
  for (let i = 0; i < ary.length; i++) {
    const key = callback(ary[i]);

    if (!results.has(key)) {
      results.set(key, ary[i]);
    }
  }

  return [...results.values()];
}

export function asArray<T>(value: T | T[]): T[] {
  return Array.isArray(value) ? value : [value]; 
}