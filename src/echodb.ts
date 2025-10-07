import { EventEmitter } from 'eventemitter3';
import DatabaseProvider from './DatabaseProvider';
import SyncProvider, { AuthOptions } from './SyncProvider';
import Table from './Table';
import { toRawObject } from './schema';

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
}

export type SyncOptions = {
  url?: string;
  enabled?: boolean;
  connectionType?: string;
  events?: EventOptions;
  adapter?: SyncProvider;
  autoStart?: boolean;
  interval?: number;
}

export type EchoDBOptions = {
  adapter: DatabaseProvider;
  sync?: SyncOptions;
}
export default class EchoDB extends EventEmitter {
  provider: DatabaseProvider;
  syncAdapter: SyncProvider;

  constructor(public options: EchoDBOptions) {
    super();
    this.provider = options.adapter;
    if (options.sync && (options.sync as SyncOptions).adapter) {
      this.syncAdapter = options.sync.adapter;
      this.provider.syncAdapter = this.syncAdapter;
      if (options.sync.enabled && options.sync.autoStart !== false) {
        const adapter = options.sync.adapter;
        adapter.localAdapter = options.adapter;
        adapter.dbName = this.provider.name;
        adapter.schemas = toRawObject(this.provider.options.schemas);
        adapter.on('sync:done', function () {
          this.emit('sync:done');
        });
        adapter.start();
      }
    }
    this.provider.context = this;
  }
  collection<T>(name: string) {
    const provider = this.provider;
    return provider.collection<T>(name);
  }
  table<T>(name: string) {
    return new Table<T>(name, this.provider);
  }
  close() {
    this.provider.close();
    if (this.syncAdapter) {
      this.syncAdapter.stop();
    }
  }
  drop(name?: string): any {
    return this.provider.drop(name);
  }
  authenticate(opts: AuthOptions): Promise<any> {
    return this.syncAdapter.authenticate(opts);
  }

  get isOpen(): boolean {
    return this.provider.isOpen;
  }
}
