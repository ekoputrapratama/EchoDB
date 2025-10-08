import { EventEmitter } from 'eventemitter3';
import DatabaseProvider from './databaseProvider';
import SyncProvider from './syncProvider';
import Table from './table';
import { toRawObject } from './schema';
import { AuthOptions, EchoDBOptions, SyncOptions } from './types';

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
