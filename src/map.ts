type Opts = {
  onNullableKey?: 'raise' | 'skip' | 'allow';
  onDuplicateKey?: 'raise' | 'use-latest' | 'use-oldest';
}

/**
 * Gets (not calls) the value of `prop` for each `elem` and returns a
 * `ReadonlyMap` where the value of `prop` is the key and each `elem` is the value.
 * 
 *    const users = [
 *      { name: 'Dakota', id: 210532 },
 *      { name: 'Jake', id: 5 },
 *    ];
 * 
 *    const idMap = indexBy(users, 'id');
 *    idMap.get(210532) === 'Dakota';
 * 
 * The optional third argument lets you customize behavior in two exceptional cases.
 * 
 * `onNullableKey` controls how to handle a key that's null or undefined. Defaults to `skip`,
 * but can also be `raise` or `allow`.
 * 
 * `onDuplicateKey` controls how to handle a key that would overwrite another key. Defaults to
 * `use-latest`, but can also be `use-oldest` or `raise`.
 * 
 *    const map = indexBy(..., ..., {
 *      onNullableKey: 'raise',
 *      onDuplicateKey: 'raise',
 *    });
 */
export function indexBy<T, K extends keyof T>(
  elems: T[], 
  prop: K,
  {
    onNullableKey = 'skip',
    onDuplicateKey = 'use-latest',
  }: Opts = {},
) {
  const out = new Map<T[K], T>();

  for (let elem of elems) {
    const val = elem[prop];

    if (val == null) {
      switch(onNullableKey) {
        case 'raise': {
          throw new Error(`Got nullable key: ${val} for property ${prop}`);
        }
        case 'skip': {
          continue;
        }
      }
    }

    if (onDuplicateKey === 'use-latest') {
      // don't need to check in that case, that's how maps work anyways
      out.set(val, elem);
    } else {
      const has = out.has(val);
      if (!has) {
        out.set(val, elem);
        continue;
      }

      if (onDuplicateKey === 'raise') {
        throw new Error(`Got property with duplicate values: ${prop}.`);
      }

      // don't need to handle use-oldest, just fall through
    }
  }

  return out as ReadonlyMap<T[K], T>;
}

/**
 * Gets (not calls) the value of `prop` and returns a
 * `ReadonlyMap` where the value of `prop` is the key
 * and each `elem` with that value is grouped into an array.
 * 
 * This function is different from `indexBy` in that the map
 * values will always be arrays that contain every single
 * entry with the given property matching that value.
 * 
 *    const users = [
 *      { username: 'Dakota', theme: 'PCMaster' },
 *      { username: 'Nina', theme: 'PCMaster' },
 *      { username: 'Jake', theme: 'VIII' },
 *    ];
 * 
 *    const usersByTheme = groupBy(users, 'theme');
 *    const usersWithPCMaster = usersByTheme.get('PCMaster');
 * 
 * This example returns an array containing the "Dakota" and "Nina"
 * entries in the original list.
 * 
 * This function accepts an options bag with a single argument, `onNullableKey`, 
 * which controls how to handle a key that's null or undefined. Defaults to `skip`,
 * but can also be `raise` or `allow`.
 */
export function groupBy<T, K extends keyof T>(
  elems: T[],
  prop: K,
  {
    onNullableKey = 'skip',
  }: Pick<Opts, 'onNullableKey'> = {},
) {
  const out = new Map<T[K], T[]>();

  for (let elem of elems) {
    const val = elem[prop];

    if (val == null) {
      switch(onNullableKey) {
        case 'raise': {
          throw new Error(`Got nullable key: ${val} for property ${prop}`);
        }
        case 'skip': {
          continue;
        }
      }
    }

    if (out.has(val)) {
      out.set(val, [...out.get(val)!, elem]);
    } else {
      out.set(val, [elem]);
    }
  }

  return out as ReadonlyMap<T[K], T[]>;
}