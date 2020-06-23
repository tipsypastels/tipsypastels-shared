import { capitalize } from "./string";
import { Days } from "./time";

export const strftimeWithoutExtensions = require('strftime');

/**
 * Formats a date using Ruby's `strftime` semantics.
 * @see {@link https://github.com/samsonjs/strftime}
 */
export function strftime(code: string, date: Datelike = new Date()): string {
  return strftimeWithoutExtensions(code, resolveDate(date));
}

/** 
 * An object resolvable to a `Date` using the `resolveDate` function.
 * Most exported helpers will accept an object matching this format.  
 */
export type Datelike = Date | number | string;

/** Takes a `Datelike` and resolves it to a `Date`. */
export function resolveDate(date: Datelike): Date {
  switch (typeof date) {
    case 'object':
      return date;
    case 'string':
      return new Date(date);
    case 'number':
      return new Date(date * 1000);
  }
}

/**
 * Returns the number of days between `date1` and `date2`. Conventionally, `date2` is used as the today value, but any dates can be used.
 * 
 * The number will be positive if `date1` is in the past of `date2`, negative if `date1` is in the future of `date2`, and `0` otherwise.
 */
export function numericDateDiff(date1: Datelike, date2: Datelike): number {
  date1 = resolveDate(date1);
  date2 = resolveDate(date2);

  const utc1 = Date.UTC(date1.getFullYear(), date1.getMonth(), date1.getDate());
  const utc2 = Date.UTC(date2.getFullYear(), date2.getMonth(), date2.getDate());

  return Math.floor((utc2 - utc1) / Days(1));
}

/** Returns `"today"`, `"yesterday"`, or `"tomorrow"` if one of those is the difference between `date` and the current date, otherwise `undefined`. */
export function humanizedDateDiff(date: Datelike) {
  date = resolveDate(date);
  const today = getToday();

  switch (numericDateDiff(date, today)) {
    case 0:
      return 'today';
    case -1:
      return 'tomorrow';
    case 1:
      return 'yesterday';
  }
}

// format: May 07, 2019
// export function standardDate(date: Datelike): string {
//   date = resolveDate(date);
//   return strftime('%B %d, %Y', date);
// }

/**
 * A date function with the following format:
 * 
 * - `Today at 9:15 PM`
 * - `Yesterday at 9:15 PM`
 * - `Tomorrow at 9:15 PM`
 * - `February 9th, 2020 at 9:15 PM`
 */
export const createdAtDateFormat = createDateFormat(date => {
  const humanizedWord = humanizedDateDiff(date);
  if (humanizedWord) {
    return `${capitalize(humanizedWord)} at %-l:%M %p`;
  } else {
    return '%B %-o, %Y at %-l:%M %p';
  }
});

/**
 * A date function with the following format:
 * 
 * - `9:15 PM` (for today)
 * - `Yesterday 9:15 PM`
 * - `Tomorrow 9:15 PM`
 * - `Feb 9th, 2020 9:15 PM`
 */
export const notificationDateFormat = createDateFormat(date => {
  const humanizedWord = humanizedDateDiff(date);
  if (humanizedWord === 'today') {
    return '%-l:%M %p';
  } else if (humanizedWord) {
    return `${capitalize(humanizedWord)} %-l:%M %p`;
  } else {
    return '%b %-o, %Y %-l:%M %p';;
  }
})

/** Returns true if `date` is yesterday or earlier. */
export function isPast(date: Datelike, today = new Date()): boolean {
  return numericDateDiff(date, today) > 0;
}

/** Returns true if `date` is tomorrow or later. */
export function isFuture(date: Datelike, today = new Date()): boolean {
  return numericDateDiff(date, today) < 0;
}

/** Returns true if `date` is the same day (but not necessarily time) as `today`. */
export function isToday(date: Datelike, today = new Date()): boolean {
  return numericDateDiff(date, today) === 0;
}

/** Clones a date object. */
export function cloneDate(date: Datelike): Date {
  return new Date(resolveDate(date).toString());
}

/** Returns today's date as a `Date` object. */
export function getToday() {
  return new Date();
}

/** Returns tomorrow's date as a `Date` object. */
export function getTomorrow() {
  return getDaysFromNow(1);
}

/** Returns yesterday's date as a `Date` object. */
export function getYesterday() {
  return getDaysAgo(1);
}

/** Returns a `Date` object for `count` days ago. */
export function getDaysAgo(count: number) {
  return getDaysFromNow(-count);
}

/** Returns a `Date` object for `count` days from now. */
export function getDaysFromNow(count: number) {
  const newDate = cloneDate(new Date());
  newDate.setDate(newDate.getDate() + count);
  return newDate;
}

/** Creates a date-formatting function. */
export function createDateFormat(codes: string | ((date: Date) => string)) {
  if (typeof codes === 'string') {
    return function(date: Datelike): string {
      return strftime(codes, resolveDate(date));
    }
  } else {
    return function(date: Datelike): string {
      date = resolveDate(date);
      return strftime(codes(date), date);
    }
  }
}