import 'array.prototype.move';
import SyncProvider from './SyncProvider';
import DatabaseProvider, {
  CursorProvider,
  CollectionProvider,
  DocumentObject,
  DocumentObjectCondition,
} from './DatabaseProvider';
import EchoDB from './echodb';
import * as validate from './utils/validate';
import { validateSchema, normalize, toRawObject } from './schema';
import * as ObjectUtil from './utils/objects';
import * as utils from './utils/util';
import { default as traverse } from './utils/traverse';
import { default as Schema } from './schema';
export { default as ListenerCollection } from './utils/listenerCollection';
export { default as NetworkProvider } from './network/node';

export default EchoDB;

export const Utility = {
  ...validate,
  ...utils,
  ...ObjectUtil,
  traverse,
  validateSchema,
  normalizeSchemas: normalize,
  toRawObject,
};

export {
  EchoDB,
  Schema,
  SyncProvider,
  DatabaseProvider,
  CursorProvider,
  CollectionProvider,
  DocumentObject,
  DocumentObjectCondition,
};
