import strftime from 'strftime';

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
export function relativeDateOf(date: Datelike) {
  date = resolveDate(date);
  const today = new Date();

  switch (numericDateDiff(date, today)) {
    case 0:
      return 'today';
    case -1:
      return 'tomorrow';
    case 1:
      return 'yesterday';
    default:
      return standardDate(date);
  }
}

// format: May 07, 2019
export function standardDate(date: Datelike) {
  date = resolveDate(date);
  return strftime('%B %d, %Y', date);
}

// format: May 07, 2019 at 10:22 PM
export function standardDateTime(date: Datelike) {
  date = resolveDate(date);
  return strftime('%B %d, %Y at %l:%M %p', date);
}

// format: 10:22 PM
export function standardTime(date: Datelike) {
  date = resolveDate(date);
  return strftime('%l:%M %p', date);
}

export function notificationDateFormat(date: Datelike) {
  date = resolveDate(date);

  if (isToday(date)) {
    return strftime('%l:%M %p', date);
  }

  return strftime('%b %d, %Y %l:%M %p', date);
}

export function yearsSince(date: Datelike) {
  date = resolveDate(date);
  return (new Date()).getFullYear() - (date).getFullYear();
}

export function isPast(date: Datelike, today = new Date()): boolean {
  return numericDateDiff(date, today) > 0;
}

export function isFuture(date: Datelike, today = new Date()): boolean {
  return numericDateDiff(date, today) < 0;
}

export function isToday(date: Datelike, today = new Date()): boolean {
  return numericDateDiff(date, today) === 0;
}

// returns { current, prev, next } of date objects, each for the first millisecond of the month. used in DatePicker
export function getSurroundingMonths(date = new Date()) {
  date = resolveDate(date);

  const dateMonth = date.getMonth();
  const dateYear = date.getFullYear();

  // dont worry about looping over! it does that automatically :D
  const current = new Date(dateYear, dateMonth, 1);
  const prev = new Date(dateYear, dateMonth - 1, 1);
  const next = new Date(dateYear, dateMonth + 1, 1);

  return { current, prev, next };
}

export function daysInMonth(date: Datelike): number {
  date = resolveDate(date);
  return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
}

export function cloneDate(date: Datelike): Date {
  return new Date(resolveDate(date).toString());
}

export const Milliseconds = (count: number) => count;
export const Seconds = (count: number) => count * 1000;
export const Minutes = (count: number) => Seconds(count) * 60;
export const Hours = (count: number) => Minutes(count) * 60;
export const Days = (count: number) => Hours(count) * 24;
export const Weeks = (count: number) => Weeks(count) * 7;
export const Months = (count: number) => Weeks(count) * 4;
export const Years = (count: number) => Days(count) * 365;