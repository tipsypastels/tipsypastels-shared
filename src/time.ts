import { Datelike, cloneDate, resolveDate } from "./date";

type TimeUnitFromMs = (ms: number) => number;

type TimeUnitOpts = {
  beginning: (date: Date) => void;
  end: (date: Date) => void;
}

type TimeUnitMethods = {
  beginning: (date?: Datelike) => Date;
  end: (date?: Datelike) => Date;
  since: (date: Datelike) => number;
  until: (date: Datelike) => number;
};

export type TimeUnit = 
  & TimeUnitFromMs 
  & TimeUnitMethods 

export function diffTimeInUnits(unit: TimeUnitFromMs, a: Datelike, b: Datelike) {
  return (resolveDate(a).getTime() - resolveDate(b).getTime()) / unit(1);
}

export function createTimeUnit(fromMs: TimeUnitFromMs, opts: TimeUnitOpts): TimeUnit {
  return Object.assign(fromMs, {
    beginning(date: Datelike = new Date()) {
      const newDate = cloneDate(date);
      opts.beginning(newDate);
      return newDate;
    },
    end(date: Datelike = new Date()) {
      const newDate = cloneDate(date);
      opts.end(newDate);
      return newDate;
    },
    diff(a: Datelike, b: Datelike) {
      return diffTimeInUnits(fromMs, a, b);
    },
    since(date: Datelike) {
      return diffTimeInUnits(fromMs, new Date(), date);
    },
    until(date: Datelike) {
      return diffTimeInUnits(fromMs, date, new Date());
    },
  });
}

function createMonthLengthTimeUnit(days: number) {
  return createTimeUnit(ms => Days(ms) * days, {
    beginning: date => {
      date.setDate(1);
      date.setHours(0, 0, 0, 0);
    },
    end: date => {
      date.setDate(days);
      date.setHours(23, 59, 59, 999);
    },
  });
}

export const Milliseconds = createTimeUnit(ms => ms, {
  beginning: date => date,
  end: date => date,
});

export const Seconds = createTimeUnit(ms => ms * 1000, {
  beginning: date => date.setMilliseconds(0),
  end: date => date.setMilliseconds(59),
});

export const Minutes = createTimeUnit(ms => Seconds(ms) * 60, {
  beginning: date => date.setSeconds(0, 0),
  end: date => date.setSeconds(59, 99),
});

export const Hours = createTimeUnit(ms => Minutes(ms) * 60, {
  beginning: date => date.setMinutes(0, 0, 0),
  end: date => date.setMinutes(59, 59, 999),
});

export const Days = createTimeUnit(ms => Hours(ms) * 24, {
  beginning: date => date.setHours(0, 0, 0, 0),
  end: date => date.setHours(23, 59, 59, 999),
});

export const Weeks = createTimeUnit(ms => Days(ms) * 7, {
  beginning: date => {
    const dayOfWeek = date.getDay();
    date.setDate(date.getDate() - dayOfWeek);
    date.setHours(0, 0, 0, 0);
  },
  end: date => {
    const dayOfWeek = date.getDate();
    date.setDate(date.getDate() + (8 - dayOfWeek));
    date.setHours(23, 59, 59, 999);
  },
});

export const Months28Days = createMonthLengthTimeUnit(28);
export const Months29Days = createMonthLengthTimeUnit(29);
export const Months30Days = createMonthLengthTimeUnit(30);
export const Months31Days = createMonthLengthTimeUnit(31);

export const Years = createTimeUnit(ms => Days(ms) * 365, {
  beginning: date => {
    date.setMonth(0);
    date.setDate(1);
    date.setHours(0, 0, 0, 0);
  },
  end: date => {
    date.setMonth(11);
    date.setDate(31);
    date.setHours(23, 59, 59, 999);
  }
});