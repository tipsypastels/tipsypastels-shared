import * as Time from '../helpers/time';
import { getToday } from '../helpers/date';

/*
 * It's easier to override the global Date object to return a mock value for today rather than dynamically calculating all the date diffs.
 */

const MOCK_TODAY = 'Wed Feb 05 2020 11:42:30 GMT-0800 (Pacific Standard Time)';

describe('time helpers', () => {
  const realDate = Date;
  const mockDate = new Date(MOCK_TODAY);

  // @ts-ignore
  global['Date'] = class extends Date {
    constructor(date?: any) {
      if (date) {
        super(date);
      } else {
        super(mockDate);    
      }
    }
  }

  test('mock date', () => {
    expect(getToday().toString()).toBe(MOCK_TODAY);
  });

  test('all values in milliseconds', () => {
    expect(Time.Milliseconds(1)).toBe(1);
    expect(Time.Seconds(1)).toBe(1000);
    expect(Time.Minutes(1)).toBe(60000);
    expect(Time.Hours(1)).toBe(3600000);
    expect(Time.Days(1)).toBe(86400000);
    expect(Time.Weeks(1)).toBe(604800000);
    expect(Time.Months28Days(1)).toBe(86400000 * 28);
    expect(Time.Months29Days(1)).toBe(86400000 * 29);
    expect(Time.Months30Days(1)).toBe(86400000 * 30);
    expect(Time.Months31Days(1)).toBe(86400000 * 31);
    expect(Time.Years(1)).toBe(31536000000);
  });

  test('beginning', () => {
    expect(Time.Milliseconds.beginning().toString())
      .toBe(MOCK_TODAY);

    expect(Time.Seconds.beginning().toString())
      .toBe(MOCK_TODAY);

    expect(Time.Minutes.beginning().toString())
      .toBe(`Wed Feb 05 2020 11:42:00 GMT-0800 (Pacific Standard Time)`);

    expect(Time.Hours.beginning().toString())
      .toBe(`Wed Feb 05 2020 11:00:00 GMT-0800 (Pacific Standard Time)`);

    expect(Time.Days.beginning().toString())
      .toBe(`Wed Feb 05 2020 00:00:00 GMT-0800 (Pacific Standard Time)`);

    expect(Time.Weeks.beginning().toString())
      .toBe(`Sun Feb 02 2020 00:00:00 GMT-0800 (Pacific Standard Time)`);

    // all months have the same beginning
    expect(Time.Months28Days.beginning().toString())
      .toBe(`Sat Feb 01 2020 00:00:00 GMT-0800 (Pacific Standard Time)`);

    expect(Time.Years.beginning().toString())
      .toBe(`Wed Jan 01 2020 00:00:00 GMT-0800 (Pacific Standard Time)`);
  });

  test('end', () => {
    expect(Time.Milliseconds.end().toString())
      .toBe(MOCK_TODAY);

    expect(Time.Seconds.end().toString())
      .toBe(MOCK_TODAY);

    expect(Time.Minutes.end().toString())
      .toBe(`Wed Feb 05 2020 11:42:59 GMT-0800 (Pacific Standard Time)`);

    expect(Time.Hours.end().toString())
      .toBe(`Wed Feb 05 2020 11:59:59 GMT-0800 (Pacific Standard Time)`);

    expect(Time.Days.end().toString())
      .toBe(`Wed Feb 05 2020 23:59:59 GMT-0800 (Pacific Standard Time)`);

    expect(Time.Weeks.end().toString())
      .toBe(`Sat Feb 08 2020 23:59:59 GMT-0800 (Pacific Standard Time)`);

    expect(Time.Months28Days.end().toString())
      .toBe(`Fri Feb 28 2020 23:59:59 GMT-0800 (Pacific Standard Time)`);

    // mock date is a leap year
    expect(Time.Months29Days.end().toString())
      .toBe(`Sat Feb 29 2020 23:59:59 GMT-0800 (Pacific Standard Time)`);

    expect(Time.Months30Days.end().toString())
      .toBe(`Sun Mar 01 2020 23:59:59 GMT-0800 (Pacific Standard Time)`);

    expect(Time.Months31Days.end().toString())
      .toBe(`Mon Mar 02 2020 23:59:59 GMT-0800 (Pacific Standard Time)`);

    expect(Time.Years.end().toString())
      .toBe(`Thu Dec 31 2020 23:59:59 GMT-0800 (Pacific Standard Time)`)
  });
});