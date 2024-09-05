import { Dayjs } from 'dayjs';
import { DATE_TIME_FORMAT } from 'shared/const';

export function dateToString(dayjs: Dayjs) {
  return dayjs.format(DATE_TIME_FORMAT);
}
