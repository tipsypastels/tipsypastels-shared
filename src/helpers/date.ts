export const strftime = require('strftime');

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
export function humanizedDateDiff(date: Datelike, callback = standardDate) {
  date = resolveDate(date);
  const today = getToday();

  switch (numericDateDiff(date, today)) {
    case 0:
      return 'today';
    case -1:
      return 'tomorrow';
    case 1:
      return 'yesterday';
    default:
      return callback(date);
  }
}

// format: May 07, 2019
export function standardDate(date: Datelike): string {
  date = resolveDate(date);
  return strftime('%B %d, %Y', date);
}

// format: May 07, 2019 at 10:22 PM
export function standardDateTime(date: Datelike): string {
  date = resolveDate(date);
  return strftime('%B %d, %Y at %l:%M %p', date);
}

// format: 10:22 PM
export function standardTime(date: Datelike): string {
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