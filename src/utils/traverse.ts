import isString from 'lodash/isString';
import isNumber from 'lodash/isNumber';
import isObject from 'lodash/isObject';
import isNull from 'lodash/isNull';
import isUndefined from 'lodash/isUndefined';

/**
 * traverseFilter({
 *
 * })
 * @param obj
 * @param queries
 * @param item
 */
export default function traverseFilter<T>(obj: T, queries, item): T {
  for (let i in obj) {
    if (!isNull(obj[i]) && !isUndefined(obj[i]) && isObject(obj[i])) {
      traverseFilter(obj[i], queries, item);
    } else {
      let query = queries[i];
      if (query) {
      }
      // if (!(obj[i] instanceof Types.ObjectId) && (isString(obj[i]) || isNumber(obj[i]))) {
      //   obj[i] = Types.ObjectId((obj[i] as any)) as any;
      // }
    }
  }
  return obj;
}
