/* eslint-disable no-prototype-builtins */
import isString from 'lodash/isString';
import Schema from '../schema';
import isNumber from 'lodash/isNumber';
import moment from 'moment';
import isObject from 'lodash/isObject';
import { PopulateObject } from '../types';

export const validSchemaProperty = [
  'unique',
  'primaryKey',
  'autoIncrement',
  'type',
  'index',
];

export function validateSchemaProps(keys: Array<string>) {
  keys.forEach((key) => {
    if (!validSchemaProperty.includes(key)) {
      throw new Error('property ' + key + ' is not a known property');
    }
  });
}

export function validateSchema(schemas: Record<string, Schema>) {
  for (const key in schemas) {
    if (!(schemas[key] instanceof Schema)) {
      throw new Error(key + ' schema is not valid schema');
    }
  }
}

export function validatePopulate(obj: object & PopulateObject) {
  if (!obj.hasOwnProperty('localField'))
    throw new Error('populate should have localField property');
  if (!obj.hasOwnProperty('foreignField'))
    throw new Error('populate should have foreignField property');
  if (!obj.hasOwnProperty('ref'))
    throw new Error('populate should have ref property');
}

export function validatePopulates(arr: PopulateObject[]) {
  for (const obj of arr) {
    validatePopulate(obj);
  }
}

export function validateData(data: any, schema: any) {
  if (data === null || data === 'undefined') {
    throw new Error('cannot validate data with null or undefined value');
  }
  Object.keys(data).forEach((key) => {
    const fields = schema.fields;
    const field = fields[key];
    const type = field.type || field;
    switch (type) {
      case String:
        if (!isString(data[key])) {
          throw new Error(
            'column ' +
              key +
              ' expected to have type of string but ' +
              typeof data[key] +
              ' given.'
          );
        }
        break;
      case Number:
        if (!isNumber(data[key])) {
          throw new Error(
            'column ' +
              key +
              ' expected to have type of number but ' +
              typeof data[key] +
              ' given.'
          );
        }
        break;
      case Array:
        if (!Array.isArray(data[key])) {
          throw new Error(
            'column ' +
              key +
              ' expected to have type of array but ' +
              typeof data[key] +
              ' given.'
          );
        }
        break;
      case Date:
        if (!moment.isDate(data[key])) {
          throw new Error(
            'column ' +
              key +
              ' expected to have type of date but ' +
              typeof data[key] +
              ' given.'
          );
        }
        break;
      case Object:
        if (!isObject(data[key])) {
          throw new Error(
            'column ' +
              key +
              ' expected to have type of object but ' +
              typeof data[key] +
              ' given.'
          );
        }
        break;
    }
  });
}

export function isFirestoreTimestamp(obj: any) {
  const keys = Object.keys(obj);
  return (
    keys.includes('nanoseconds') &&
    keys.includes('seconds') &&
    typeof obj.toDate === 'function'
  );
}
