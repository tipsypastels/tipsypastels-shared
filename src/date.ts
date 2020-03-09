import { createPicker } from "./picker";
import { capitalize } from "./string";

export const strftimeWithoutExtensions = require('strftime');

const DAY_OF_MONTH_SUFFIX = createPicker({
  1: 'st', 21: 'st', 31: 'st',
  2: 'nd', 22: 'nd',
  3: 'rd', 23: 'rd',
}, 'th')

export const STRFTIME_EXTENSIONS = {
  _(date: Date): string {
    return DAY_OF_MONTH_SUFFIX(date.getDate());
  }
}

const STRFTIME_EXTENSION_REGEX = new RegExp(`%(${Object.keys(STRFTIME_EXTENSIONS).join('|')})`, 'g')

export function strftime(code: string, date: Datelike = new Date()): string {
  date = resolveDate(date);
  code = code.replace(STRFTIME_EXTENSION_REGEX, (_, key) => {
    return STRFTIME_EXTENSIONS[key](date);
  });

  return strftimeWithoutExtensions(code, date);
}

export type Datelike = Date | number | string;

export const MS_PER_DAY = 1000 * 60 * 60 * 24;

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

export function numericDateDiff(date1: Datelike, date2: Datelike): number {
  date1 = resolveDate(date1);
  date2 = resolveDate(date2);

  const utc1 = Date.UTC(date1.getFullYear(), date1.getMonth(), date1.getDate());
  const utc2 = Date.UTC(date2.getFullYear(), date2.getMonth(), date2.getDate());

  return Math.floor((utc2 - utc1) / MS_PER_DAY);
}

// Returns "today", "yesterday", or "tomorrow" if one of those is correct, otherwise just returns the formatted date.
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
 * Today/Yesterday/Tomorrow at 9:15 PM
 * February 9th, 2020 at 9:15 PM
 */
export const createdAtDateFormat = createDateFormat(date => {
  const humanizedWord = humanizedDateDiff(date);
  if (humanizedWord) {
    return `${capitalize(humanizedWord)} at %l:%M %p`;
  } else {
    return '%B %e%_, %Y at %l:%M %p';
  }
});

/**
 * 9:15 PM
 * Yesterday 9:15 PM
 * Feb 9th, 2020 9:15 PM
 */
export const notificationDateFormat = createDateFormat(date => {
  const humanizedWord = humanizedDateDiff(date);
  if (humanizedWord === 'today') {
    return '%l:%M %p';
  } else if (humanizedWord) {
    return `${capitalize(humanizedWord)} %l:%M %p`;
  } else {
    return '%b %e%_, %Y %l:%M %p';;
  }
})

export function isPast(date: Datelike, today = new Date()): boolean {
  return numericDateDiff(date, today) > 0;
}

export function isFuture(date: Datelike, today = new Date()): boolean {
  return numericDateDiff(date, today) < 0;
}

export function isToday(date: Datelike, today = new Date()): boolean {
  return numericDateDiff(date, today) === 0;
}

export function cloneDate(date: Datelike): Date {
  return new Date(resolveDate(date).toString());
}

export function getToday() {
  return new Date();
}

export function getTomorrow() {
  return getDaysFromNow(1);
}

export function getYesterday() {
  return getDaysAgo(1);
}

export function getDaysAgo(count: number) {
  return getDaysFromNow(-count);
}

export function getDaysFromNow(count: number) {
  const newDate = cloneDate(new Date());
  newDate.setDate(newDate.getDate() + count);
  return newDate;
}

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