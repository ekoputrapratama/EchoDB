import { expect, test } from 'vitest';
import { wrapObject } from '../../src/utils/objects';

test('should wrap object', () => {
  const keys = Object.keys(wrapObject({}, {})).sort();
  const expectedKeys = Object.keys({
    update: () => {},
    delete: () => {},
  }).sort();
  expect(keys).toEqual(expectedKeys);
});
