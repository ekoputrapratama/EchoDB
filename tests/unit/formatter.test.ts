import { expect, test } from 'vitest';
import moment from 'moment';
import { formatDate, formatNumber } from '../../src/utils/formatter';

test('should format numbers', () => {
  expect(formatNumber(1000, '#.###', '.')).toBe('1.000');
  expect(formatNumber(1000, '#,###', ',')).toBe('1,000');
});

test('should format date', () => {
  const now = Date.now();
  const expected = moment(now).format('DD-MM-YYYY');
  expect(formatDate(now, 'DD-MM-YYYY')).toBe(expected);
});
