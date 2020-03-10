import { mapObject } from '../object';

describe('object helpers', () => {
  describe(mapObject, () => {
    it("maps an object to a collection", () => {
      expect(mapObject({ a: 'b', c: 'd'}, (k, v) => k + v))
        .toEqual(['ab', 'cd'])
    });
  });
});