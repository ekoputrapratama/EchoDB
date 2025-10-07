// / <reference path="../dist/sonicdb.d.ts" />

declare namespace NodeJS {
  interface Global {
    indexedDB: IDBDatabase;
    IDBKeyRange: IDBKeyRange;
    db: any;
    Dexie: any;
    process: any;
    // expect: Chai.ExpectStatic;
  }
  interface Process {
    browser: boolean;
  }
}
interface Array<T> {
  move(oldIndex: number, newIndex: number): any[];
}
declare var db: any;
// declare var expect: Chai.ExpectStatic;
// declare var EventEmitter: typeof NodeJS.EventEmitter;
