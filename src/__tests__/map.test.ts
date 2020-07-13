import { indexBy } from '../map';

const LIST = [
  { name: 'Dakota', id: 210532 },
  { name: 'Jake', id: 5 },
];

const LIST_WITH_NULLABLES = [
  ...LIST,
  { name: 'Fake User', id: null },
];

const LIST_WITH_DUPS = [
  ...LIST,
  { name: 'Dakota2', id: 210532 },
];

describe(indexBy, () => {
  it('converts a list of objects to a map indexed by a given property', () => {
    expect(indexBy(LIST, 'id')).toStrictEqual(
      new Map([
        [210532, LIST[0]], 
        [5, LIST[1]],
      ])
    );

    expect(indexBy(LIST, 'name')).toStrictEqual(
      new Map([
        ['Dakota', LIST[0]], 
        ['Jake', LIST[1]],
      ])
    );
  });
  
  it('ignores nullable keys', () => {
    expect(indexBy(LIST_WITH_NULLABLES, 'id')).toStrictEqual(
      new Map([
        [210532, LIST[0]], 
        [5, LIST[1]],
      ])
    );
  });

  it('allows nullable keys if onNullableKey=allow', () => {
    expect(indexBy(LIST_WITH_NULLABLES, 'id', { onNullableKey: 'allow' })).toStrictEqual(
      new Map([
        [210532, LIST[0]],
        [5, LIST[1]],
        [null, LIST_WITH_NULLABLES[2]],
      ])
    );
  });

  it('raises on nullable keys if onNullableKey=raise', () => {
    expect(() => {
      indexBy(LIST_WITH_NULLABLES, 'id', { onNullableKey: 'raise' })
    }).toThrowError();
  });

  it('allows overwriting keys', () => {
    expect(indexBy(LIST_WITH_DUPS, 'id')).toStrictEqual(new Map([
      [5, LIST[1]],
      [210532, LIST_WITH_DUPS[2]],
    ]));
  });

  it('ignores dupe keys if onDuplicateKey=use-oldest', () => {
    expect(indexBy(LIST_WITH_DUPS, 'id', { onDuplicateKey: 'use-oldest' })).toStrictEqual(new Map([
      [210532, LIST[0]],
      [5, LIST[1]],
    ]));
  });

  it('raises on dupe keys if onDuplicateKey=raise', () => {
    expect(() => {
      indexBy(LIST_WITH_DUPS, 'id', { onDuplicateKey: 'raise' });
    }).toThrowError();
  });
});