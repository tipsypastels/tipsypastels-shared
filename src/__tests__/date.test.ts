import { strftime, getDaysFromNow, getDaysAgo, getToday, getTomorrow, getYesterday, numericDateDiff, humanizedDateDiff, createDateFormat, strftimeWithoutExtensions, createdAtDateFormat, notificationDateFormat } from '../date';


const MOCK_TODAY = 'Wed Feb 05 2020 11:42:30 GMT-0800 (Pacific Standard Time)';
describe('date helpers', () => {
  const realDate = new Date();
  const mockDate = new Date(MOCK_TODAY);

  // @ts-ignore
  global['Date'] = class extends Date {
    constructor(date: any) {
      if (date) {
        super(date);
      } else {
        super(mockDate);
      }
    }
  }

  const TODAY = getToday();
  const TOMORROW = getTomorrow();
  const YESTERDAY = getYesterday();

  const DAY_AFTER_TOMORROW = getDaysFromNow(2);
  const DAY_BEFORE_YESTERDAY = getDaysAgo(2);


  test('numericDateDiff', () => {
    expect(numericDateDiff(YESTERDAY, TODAY)).toBe(1);
    expect(numericDateDiff(TOMORROW, TODAY)).toBe(-1);
    expect(numericDateDiff(YESTERDAY, TOMORROW)).toBe(2);
    expect(numericDateDiff(TOMORROW, YESTERDAY)).toBe(-2);
    expect(numericDateDiff(TODAY, TODAY)).toBe(0);
  });

  describe('createDateFormat', () => {
    test('with a string', () => {
      const code = '%b %-e, %Y';
      const formatter = createDateFormat(code);

      expect(formatter(TODAY)).toEqual('Feb 5, 2020');
    });

    test('with a callback', () => {
      const formatter = createDateFormat(() => '%b %-e, %Y');
      expect(formatter(TODAY)).toEqual('Feb 5, 2020');
    });
  });

  test('createdAtDateFormat', () => {
    expect(createdAtDateFormat(TODAY)).toEqual('Today at 11:42 AM');
    expect(createdAtDateFormat(YESTERDAY)).toEqual('Yesterday at 11:42 AM');
    expect(createdAtDateFormat(DAY_AFTER_TOMORROW)).toEqual('February 7th, 2020 at 11:42 AM');
  });

  test('notificationDateFormat', () => {
    expect(notificationDateFormat(TODAY)).toEqual('11:42 AM');
    expect(notificationDateFormat(YESTERDAY)).toEqual('Yesterday 11:42 AM');
    expect(notificationDateFormat(DAY_AFTER_TOMORROW)).toEqual('Feb 7th, 2020 11:42 AM');
  });
});