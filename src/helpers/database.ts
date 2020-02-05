export function idObjectsEqual<T extends { id: number }>(a: T, b: T) {
  if (!a && !b) {
    return true;
  }

  if (!a || !b) {
    return false;
  }

  if (a.id === b.id) {
    return true;
  }
}