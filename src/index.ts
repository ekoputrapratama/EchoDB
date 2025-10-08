import 'array.prototype.move';
import EchoDB from './echodb';

export { default as SyncProvider } from './syncProvider';
export {
  default as DatabaseProvider,
  CursorProvider,
  CollectionProvider,
} from './databaseProvider';
export * from './utils/validate';
export {
  default as Schema,
  validateSchema,
  normalize as normalizeSchemas,
  toRawObject,
} from './schema';
export * from './utils/objects';
export * from './utils/util';
export * from './utils/traverse';
export { default as ListenerCollection } from './utils/listenerCollection';
export { loadNetworkProvider } from './network';
export * from './types';
export { default as Table } from './table';

export default EchoDB;

if (process.env.BROWSER) {
  (window as any).EchoDB = EchoDB;
} else if (typeof global !== 'undefined') {
  (global as any).EchoDB = module.exports;
}
