import { strftime, getDaysFromNow, getDaysAgo, getToday, getTomorrow, getYesterday, numericDateDiff, humanizedDateDiff } from '../helpers/date';

const TODAY = getToday();
const TOMORROW = getTomorrow();
const YESTERDAY = getYesterday();

const DAY_AFTER_TOMORROW = getDaysFromNow(2);
const DAY_BEFORE_YESTERDAY = getDaysAgo(2);

describe('date helpers', () => {
  test('numericDateDiff', () => {
    expect(numericDateDiff(YESTERDAY, TODAY)).toBe(1);
    expect(numericDateDiff(TOMORROW, TODAY)).toBe(-1);
    expect(numericDateDiff(YESTERDAY, TOMORROW)).toBe(2);
    expect(numericDateDiff(TOMORROW, YESTERDAY)).toBe(-2);
    expect(numericDateDiff(TODAY, TODAY)).toBe(0);
  });

  test('humanizedDateDiff', () => {
    expect(humanizedDateDiff(TODAY)).toBe('today');
    expect(humanizedDateDiff(YESTERDAY)).toBe('yesterday');
    expect(humanizedDateDiff(TOMORROW)).toBe('tomorrow');
    expect(humanizedDateDiff(DAY_AFTER_TOMORROW)).toBe(strftime('%B %d, %Y', DAY_AFTER_TOMORROW));
  });
});