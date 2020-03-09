import { replaceWithMatchingCapitalization as rc } from '../string';

describe('string helpers', () => {
  describe(rc, () => {
    it('replaces case insensitively and keeps the capitalization', () => {
      expect(rc('Hello', 'hello', 'world')).toBe('World');
    });

    it('ignores capitalization beyond the length of the replacement', () => {
      expect(rc('HackDeoxys', 'hackdeoxys', 'world')).toBe('WorlD');
    });
  });
})