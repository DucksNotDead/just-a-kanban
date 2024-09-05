import dayjs from 'dayjs';
import { DATE_TIME_FORMAT } from 'shared/const';

export function stringToDate(str: string) {
  return dayjs(str, DATE_TIME_FORMAT);
}
