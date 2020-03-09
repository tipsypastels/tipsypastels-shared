import { Range } from '../array';

describe('array helpers', () => {
  describe(Range, () => {
    it('creates an array', () => {
      expect(Range(1, 5)).toEqual([1, 2, 3, 4, 5]);
    });

    it('creates an exclusive array', () => {
      expect(Range(1, 5, { exclusive: true })).toEqual([1, 2, 3, 4]);
    });

    it('can be given a callback', () => {
      expect(Range(1, 5, n => n * 2))
        .toEqual([2, 4, 6, 8, 10]);
    });

    it('can be given a callback when exclusive', () => {
      expect(Range(1, 5, n => n * 2, { exclusive: true }))
        .toEqual([2, 4, 6, 8]);
    });

    it('can map to other types', () => {
      expect(Range(1, 3, n => `number ${n}`))
        .toEqual(['number 1', 'number 2', 'number 3']);
    })
  });
});