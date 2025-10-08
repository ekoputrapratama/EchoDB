import { expect, test } from 'vitest';
import {
  isBrowser,
  isInWorker,
  isNodejs,
  isWorkerAvailable,
} from '../../src/utils/util';

test('should check the correct environment', () => {
  expect(isBrowser()).toBeFalsy();
  expect(isNodejs()).toBeTruthy();
  expect(isInWorker()).toBeFalsy();
});
