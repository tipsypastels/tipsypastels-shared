import { mapObject, omitKeys, transformValues, transformKeys, camelCaseKeys, underScoreKeys } from '../object';

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
    });
  });

  describe(transformKeys, () => {
    it("transforms keys", () => {
      expect(transformKeys({ a: 1, b: 2 }, k => k.toUpperCase()))
        .toEqual({ A: 1, B: 2 });
    });

    it("can underscore", () => {
      expect(underScoreKeys({ formData: 1 }))
        .toEqual({ form_data: 1 })
    });

    it("can camelcase", () => {
      expect(camelCaseKeys({ form_data: 1 }))
        .toEqual({ formData: 1 })
    });
  });

  describe(transformValues, () => {
    it("transforms values", () => {
      expect(transformValues({ a: 1, b: 2 }, k => k.toString()))
        .toEqual({ a: '1', b: '2' });
    });
  });
});