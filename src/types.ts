import { EventEmitter } from 'eventemitter3';
import Schema from './schema';
import SyncProvider from './syncProvider';
import DatabaseProvider from './databaseProvider';

export type NetworkProvider = {
  connected: boolean;
} & EventEmitter;

export type AuthOptions = {
  username?: string;
  email?: string;
  password: string;
};

export type PopulateObject = {
  localField: string;
  foreignField: string;
  ref: string;
  as?: string;
};
export type PopulateOptions = {
  skipValidation: boolean;
};

export type EventOptions = {
  /**
   * The event name for the socket to listen when server send an event to notify
   * that there is a data changed on the server, this was also being used in collection
   * to notify user that there is some change made in the collection.
   */
  changeEventName?: string;
  /**
   * The event name for the socket to listen when server send an event to notify
   * that there is a data removed on the server, this was also being used in collection
   * to notify user that there is some change made in the collection.
   */
  removeEventName?: string;
  /**
   * The event name for the socket to listen when server send an event to notify
   * that there is a new data added on the server, this was also being used in collection
   * to notify user that there is some change made in the collection.
   */
  addEventName?: string;
  /**
   * The event name for the socket to listen when server send all data to be fetched
   * in the client
   */
  fetchEventName?: string;
};

export type SyncOptions = {
  url?: string;
  enabled?: boolean;
  connectionType?: string;
  events?: EventOptions;
  adapter?: SyncProvider;
  autoStart?: boolean;
  interval?: number;
};

export type EchoDBOptions = {
  adapter: DatabaseProvider;
  sync?: SyncOptions;
};

export type DocumentObjectCondition = {
  id?: string;
  [key: string]: any;
};

export type DocumentObject = {
  id?: any;
  updatedAt?: number | Date;
  createdAt?: number | Date;
  update?: (data) => Promise<void>;
  delete?: () => Promise<void>;
};

export type Schemas = {
  [name: string]: Schema;
};

export type SchemaColumnProps = {
  autoIncrement?: boolean;
  primaryKey?: boolean;
  unique?: boolean;
  type:
    | typeof String
    | typeof Number
    | typeof Array
    | typeof Date
    | typeof Object;
};

export type SchemaProps = {
  [name: string]:
    | SchemaColumnProps
    | typeof String
    | typeof Number
    | typeof Array
    | typeof Date
    | typeof Object;
};

export type SchemaOptions = {
  timestamp?: boolean;
};
