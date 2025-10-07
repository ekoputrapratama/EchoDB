import 'array.prototype.move';
export { default as SyncProvider } from './SyncProvider';
export { default as DatabaseProvider,
  CursorProvider,
  CollectionProvider
} from './DatabaseProvider';
import EchoDB from './echodb';
export * as validate from './utils/validate';
export { validateSchema, normalize as normalizeSchemas, toRawObject } from './schema';
export * as ObjectUtil from './utils/objects';
export * as utils from './utils/util';
export * as traverse from './utils/traverse';
export { default as Schema } from './schema';
export { default as ListenerCollection } from './utils/listenerCollection';
export { loadNetworkProvider } from './network';

export default EchoDB;

// const Utility = {
//   ...validate,
//   ...utils,
//   ...ObjectUtil,
//   ...traverse,
//   validateSchema,
//   normalizeSchemas: normalize,
//   toRawObject,
// };

// export {
//   Utility,
//   DatabaseProvider,
//   SyncProvider,
//   ListenerCollection,
//   Schema,
//   loadNetworkProvider,
//   CursorProvider,
//   CollectionProvider
// }

if (process.env.BROWSER) {
  (window as any).EchoDB = EchoDB;
} else if (typeof global !== 'undefined') {
  (global as any).EchoDB = module.exports;
}
