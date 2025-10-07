import DatabaseProvider from './DatabaseProvider';
import { EventEmitter } from 'eventemitter3';
import EchoDB from './echodb';

export type AuthOptions = {
  username?: string;
  email?: string;
  password: string;
}

export default abstract class SyncProvider extends EventEmitter {
  private _localAdapter: DatabaseProvider;
  dbName: string;
  schemas: any;
  context: EchoDB;
  abstract nextId(name: string): any;
  abstract start(): void;
  abstract stop(): void;
  abstract authenticate(opts: AuthOptions): Promise<any>;
  abstract add(name: string, data: any): Promise<any>;
  abstract update(name: string, condition, data: any): Promise<any>;
  abstract remove(name: string, condition): Promise<any>;
  abstract drop(name?: string): Promise<any>;
  set localAdapter(val) {
    this._localAdapter = val;
  }
  get localAdapter() {
    return this._localAdapter;
  }
}
