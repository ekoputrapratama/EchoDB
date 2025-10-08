import { EventEmitter } from 'eventemitter3';
import EchoDB from './echodb';
import SyncProvider from './syncProvider';
import { DocumentObjectCondition, PopulateObject } from './types';

export abstract class CursorProvider<T> {
  abstract get(): Promise<T>;
  abstract toArray(): Promise<T[]>;
  abstract distinct(spec: any): CursorProvider<T>;
  abstract filter(spec: any): CursorProvider<T>;
  abstract limit(num: number): CursorProvider<T>;
  abstract sort(spec: any): CursorProvider<T>;
  abstract populate(spec: PopulateObject): CursorProvider<T>;
  abstract populates(spec: PopulateObject[], options?: any): CursorProvider<T>;
}

export abstract class CollectionProvider<T> extends EventEmitter {
  abstract find(obj: any): CursorProvider<T>;
  abstract findOne(obj: any): CursorProvider<T>;
  abstract add(data: T): Promise<any>;
  abstract update(
    condition: T & DocumentObjectCondition,
    data: any
  ): Promise<any>;
  abstract remove(condition: T & DocumentObjectCondition): Promise<any>;
  abstract drop(): Promise<any>;
}

export default abstract class DatabaseProvider extends EventEmitter {
  name: string;
  options: any;
  syncAdapter: SyncProvider;
  private _context: EchoDB;
  public context: EchoDB;
  abstract collection<T>(name: string): CollectionProvider<T>;
  abstract close(): void;
  abstract drop(name?: string): Promise<any>;
  abstract readonly isOpen: boolean;
}
