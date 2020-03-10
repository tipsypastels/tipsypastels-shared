import { mapObject, omitKeys } from '../object';

describe('object helpers', () => {
  describe(mapObject, () => {
    it("maps an object to a collection", () => {
      expect(mapObject({ a: 'b', c: 'd'}, (k, v) => k + v))
        .toEqual(['ab', 'cd'])
    });
  });

  describe(omitKeys, () => {
    it("removes keys", () => {
      expect(omitKeys({ a: 1, b: 2, c: 3, d: 4 }, ['a', 'b']))
        .toEqual({ c: 3, d: 4 })
    })
  })
});