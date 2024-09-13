import { DatePicker as AntDatePicker } from 'antd';
import dayjs, { Dayjs } from 'dayjs';
import { useCallback } from 'react';
import { DATE_TIME_FORMAT } from 'shared/const';

interface IProps {
  min?: Dayjs;
  value: Dayjs | undefined;
  onChange: (dayjs: Dayjs) => void;
}

const range = (start: number, end: number) => {
  const result = [];
  for (let i = start; i < end; i++) {
    result.push(i);
  }
  return result;
};

export function DateTimePicker({ min, onChange, value }: IProps) {
  const disableDaysBeforeToday = useCallback(
    (current: Dayjs) => {
      return current < dayjs().startOf('day');
    },
    [min],
  );

  const disableMinTime = useCallback(
    (date: Dayjs) => {
      const current = dayjs();

      const sameAsCurrent =
        date.year() === current?.year() &&
        date.month() === current.month() &&
        date.date() === current.date();

      const sameAsMin =
        date.year() === min?.year() &&
        date.month() === min.month() &&
        date.date() === min.date();

      if (sameAsMin) {
        return {
          disabledHours: () =>
            range(0, min?.hour() + (min?.minute() === 45 ? 1 : 0) ?? 0),
          disabledMinutes: (hour: number) =>
            hour === min?.hour() ? range(0, min.minute() + 15 ?? 0) : [],
        };
      }
      if (sameAsCurrent) {
        return {
          disabledHours: () => range(0, current.hour() ?? 0),
          disabledMinutes: (hour: number) =>
            hour === current.hour() ? range(0, current.minute() + 15 ?? 0) : [],
        };
      }
      return {};
    },
    [min],
  );

  return (
    <AntDatePicker
      placeholder={'выбрать дату'}
      value={value}
      format={DATE_TIME_FORMAT}
      disabledDate={disableDaysBeforeToday}
      disabledTime={disableMinTime}
      showTime={{ format: 'HH:mm', minuteStep: 15 }}
      minDate={min?.startOf('day')}
      onChange={onChange}
    />
  );
}
