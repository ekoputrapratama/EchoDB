import { expect, test } from 'vitest';
import {
  validateSchemaProps,
  validateSchema,
  validatePopulate,
} from '../../src/utils/validate';
import Schema from '../../src/schema';

test('should validate schema props keys', () => {
  expect(() => validateSchemaProps(['test', 'index', 'unique'])).toThrowError();
  expect(() =>
    validateSchemaProps(['primaryKey', 'index', 'unique'])
  ).not.toThrowError();
});
test('should validate schema', () => {
  expect(() =>
    validateSchema({ test: new Schema(), test2: {} })
  ).toThrowError();
  expect(() =>
    validateSchema({ test: new Schema(), test2: new Schema() })
  ).not.toThrowError();
});
test('should validate populate object', () => {
  expect(() => validatePopulate({ test: '', test2: '' })).toThrowError();
  expect(() =>
    validatePopulate({
      foreignField: 'detail_id',
      ref: 'details',
      localField: 'detail',
    })
  ).not.toThrowError();
});
