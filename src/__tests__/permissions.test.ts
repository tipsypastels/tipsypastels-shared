import { canAccessWithVisibility as access } from '../helpers/permissions';
import { VisibilityLevel } from '../types';

const NEITHER = { isModerator: false, isAuthor: false };
const MOD = { isModerator: true, isAuthor: false };
const AUTHOR = { isModerator: false, isAuthor: true };
const BOTH = { isModerator: true, isAuthor: true };

const {
  VISIBLE,
  DELETED,
  DRAFT,
  REJECTED,
  SCHEDULED,
  MODERATED,
} = VisibilityLevel;

describe(access, () => {
  test('visible', () => {
    expect(access(VISIBLE, NEITHER)).toBe(true);
  });

  test('deleted', () => {
    expect(access(DELETED, NEITHER)).toBe(false);
    expect(access(DELETED, AUTHOR)).toBe(false);
    expect(access(DELETED, MOD)).toBe(true);
  });

  test('draft', () => {
    expect(access(DRAFT, NEITHER)).toBe(false);
    expect(access(DRAFT, AUTHOR)).toBe(true);
    expect(access(DRAFT, MOD)).toBe(false);
  });

  test('rejected', () => {
    expect(access(REJECTED, NEITHER)).toBe(false);
    expect(access(REJECTED, AUTHOR)).toBe(true);
    expect(access(REJECTED, MOD)).toBe(true);
  });

  test('scheduled', () => {
    expect(access(SCHEDULED, NEITHER)).toBe(false);
    expect(access(SCHEDULED, AUTHOR)).toBe(true);
    expect(access(SCHEDULED, MOD)).toBe(true);
  });

  test('moderated', () => {
    expect(access(MODERATED, NEITHER)).toBe(false);
    expect(access(MODERATED, AUTHOR)).toBe(true);
    expect(access(MODERATED, MOD)).toBe(true);
  });
});