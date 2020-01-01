import { censorSwears as censor } from '../helpers/censor';

describe(censor, () => {
  it('censors swears', () => {
    expect(censor('fuck', 'asterisks')).toBe('****');
  });

  it('does nothing if disabled', () => {
    expect(censor('fuck', 'disabled')).toBe('fuck');
  });

  it('censors parts of strings', () => {
    expect(censor('what the fuck', 'asterisks')).toBe('what the ****');
    expect(censor('fuck you', 'asterisks')).toBe('**** you');
  });

  it('censors parts of words', () => {
    expect(censor('fucker', 'asterisks')).toBe('****er');
    expect(censor('motherfuck', 'asterisks')).toBe('mother****');
  });

  it('is case insensitive', () => {
    expect(censor('Fuck', 'asterisks')).toBe('****');
    expect(censor('fUCK', 'asterisks')).toBe('****');
    expect(censor('Fuck', 'asterisks')).toBe('****');
    expect(censor('mOtHeRfUcKeR', 'asterisks')).toBe('mOtHeR****eR');
  });

  it('supports hearts', () => {
    expect(censor('motherfucker', 'hearts')).toBe('mother♥♥♥♥er');
  });

  describe('pokemon mode', () => {
    it('supports pokemon', () => {
      expect(censor('fuck', 'pokemon')).toBe('psyduck');
      expect(censor('Fuck', 'pokemon')).toBe('Psyduck');
      expect(censor('FUCK', 'pokemon')).toBe('PSYDUCK');
    });

    it('supports a whole bunch actually', () => {
      expect(censor('cunt', 'pokemon')).toBe('cloyster');
      expect(censor('shit', 'pokemon')).toBe('muk');
      expect(censor('pussy', 'pokemon')).toBe('cloyster');
      expect(censor('bitch', 'pokemon')).toBe('rattata');
      expect(censor('nigger', 'pokemon')).toBe('jirachi');
      expect(censor('fag', 'pokemon')).toBe('hag');
    });
  });

  it('does not censor cofagrigus', () => {
    expect(censor('cofagrigus', 'asterisks')).toBe('cofagrigus');
    expect(censor('cofagrigus', 'pokemon')).toBe('cofagrigus');
  });

  it('can censor multiple things', () => {
    expect(censor('fuck fuck', 'pokemon')).toBe('psyduck psyduck');
    expect(censor('fuck shit', 'pokemon')).toBe('psyduck muk');
  })
});