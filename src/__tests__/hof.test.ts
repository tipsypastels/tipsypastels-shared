import { tap, yieldSelf, resolve } from '../hof';

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
  });
});

describe(resolve, () => {
  it('returns non-function values', () => {
    expect(resolve(1)).toBe(1);
  });

  it('calls functions', () => {
    expect(resolve(() => 1)).toBe(1);
  });

  it('works with function-returning functions', () => {
    const x = () => 1;
    expect(resolve(x)).toBe(1);
    expect(resolve(() => x)).toBe(x);
  });
})