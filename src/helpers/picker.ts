export function createPicker<T extends object>(object: T, fallback?: T[keyof T]) {
  return function (key: string | number): T[keyof T] {
    return object[key] || fallback;
  }
}