import moment from 'moment';
import { isDate } from './util';
import { isFirestoreTimestamp } from './validate';

export function formatNumber(value: any, format: string, separator: string) {
  let str = value + '';
  const splittedFormat = format.split(separator);
  const regex = new RegExp(
    format
      .replace('###', '(\\d{3})')
      .replace('#', '(\\d+)')
      .replace(separator, '')
  );
  const formatStr = splittedFormat.reduce((prev, next, index) => {
    if (!prev) return `$${index + 1}`;
    return prev + separator + `$${index + 1}`;
  }, null);

  while (regex.test(str)) {
    str = str.replace(regex, formatStr);
  }
  return str;
}

export function formatDate(value: any, format: string) {
  let date = value;
  if (isDate(date)) {
    date = date.getFullYear() + '/' + date.getMonth() + '/' + date.getDate();
  } else if (isFirestoreTimestamp(date)) {
    const dt = date.toDate();
    date = dt.getFullYear() + '/' + dt.getMonth() + '/' + dt.getDate();
  }

  return moment(date, 'YYYY/MM/DD').format(format);
}
