import EchoDB from './echodb';
import * as validate from './utils/validate';
import * as util from './utils/util';
import * as objects from './utils/objects';
import * as traverse from './utils/traverse';
import { normalize, toRawObject } from './schema';
import SyncProvider from './SyncProvider';
import DatabaseProvider, {
  CursorProvider,
  CollectionProvider,
} from './DatabaseProvider';
import ListenerCollection from './utils/listenerCollection';
import Schema from './schema';
import NetworkProvider from './network/browser';

const Utility = {
  ...validate,
  ...util,
  ...objects,
  ...traverse,
  normalizeSchemas: normalize,
  toRawObject,
};

(window as any).EchoDB = EchoDB;

Object.assign(EchoDB, {
  EchoDB,
  Utility,
  SyncProvider,
  DatabaseProvider,
  ListenerCollection,
  Schema,
  NetworkProvider,
  CursorProvider,
  CollectionProvider,
});
export {
  EchoDB,
  Utility,
  SyncProvider,
  DatabaseProvider,
  ListenerCollection,
  Schema,
  NetworkProvider,
  CursorProvider,
  CollectionProvider,
};
