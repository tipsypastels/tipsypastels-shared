import { tap, yieldSelf } from '../hof';

describe(tap, () => {
  it('calls the callback', () => {
    let sideEffectNum = 0;

    expect(tap(1, v => sideEffectNum = 1 + v)).toBe(1);
    expect(sideEffectNum).toBe(2);
  });

  it('can mutate a let-variable', () => {
    let a = 1;
    tap(undefined, () => a = 2);

    expect(a).toBe(2);
  });
});

describe(yieldSelf, () => {
  it('calls a callback on a value', () => {
    expect(yieldSelf(1, a => a + 1)).toBe(2);
  })
});