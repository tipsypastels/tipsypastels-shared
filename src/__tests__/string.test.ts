import { replaceWithMatchingCapitalization as rc, toSentence } from '../string';

describe('string helpers', () => {
  describe(rc, () => {
    it('replaces case insensitively and keeps the capitalization', () => {
      expect(rc('Hello', 'hello', 'world')).toBe('World');
    });

    it('ignores capitalization beyond the length of the replacement', () => {
      expect(rc('HackDeoxys', 'hackdeoxys', 'world')).toBe('WorlD');
    });
  });

  describe(toSentence, () => {
    it('adds a capital letter and period', () => {
      expect(toSentence('hello world')).toBe('Hello world.');
    });

    it('does not decapitalize', () => {
      expect(toSentence('hello World')).toBe('Hello World.');
    });

    it('does not overwrite punctuation', () => {
      expect(toSentence('hello world.')).toBe('Hello world.');
      expect(toSentence('hello world!')).toBe('Hello world!');
      expect(toSentence('hello world?')).toBe('Hello world?');
      expect(toSentence('hello world;')).toBe('Hello world;');
    });
  });
})