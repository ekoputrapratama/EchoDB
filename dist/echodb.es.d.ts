import { EventEmitter } from 'eventemitter3';

declare type AuthOptions = {
    username?: string;
    email?: string;
    password: string;
};

export declare abstract class CollectionProvider<T> extends EventEmitter {
    abstract find(obj: any): CursorProvider<T>;
    abstract findOne(obj: any): CursorProvider<T>;
    abstract add(data: T): Promise<any>;
    abstract update(condition: T & DocumentObjectCondition, data: any): Promise<any>;
    abstract remove(condition: T & DocumentObjectCondition): Promise<any>;
    abstract drop(): Promise<any>;
}

declare function createWorker(workerFunc: any, imports?: Function[]): Worker;

declare function createWorkerImportScript(scriptFn: Function): string;

export declare abstract class CursorProvider<T> {
    abstract get(): Promise<T>;
    abstract toArray(): Promise<T[]>;
    abstract distinct(spec: any): CursorProvider<T>;
    abstract filter(spec: any): CursorProvider<T>;
    abstract limit(num: number): CursorProvider<T>;
    abstract sort(spec: any): CursorProvider<T>;
    abstract populate(spec: PopulateObject): CursorProvider<T>;
    abstract populates(spec: PopulateObject[], options?: any): CursorProvider<T>;
}

export declare abstract class DatabaseProvider extends EventEmitter {
    name: string;
    options: any;
    syncAdapter: SyncProvider;
    private _context;
    abstract context: EchoDB;
    abstract collection<T>(name: string): CollectionProvider<T>;
    abstract close(): void;
    abstract drop(name?: string): Promise<any>;
    abstract readonly isOpen: boolean;
}

declare type DocumentObject = {
    id?: any;
    updatedAt?: number | Date;
    createdAt?: number | Date;
    update?: (data: any) => Promise<void>;
    delete?: () => Promise<void>;
};

declare type DocumentObjectCondition = {
    id?: string;
    [key: string]: any;
};

declare class EchoDB extends EventEmitter {
    options: EchoDBOptions;
    provider: DatabaseProvider;
    syncAdapter: SyncProvider;
    constructor(options: EchoDBOptions);
    collection<T>(name: string): CollectionProvider<T>;
    table<T>(name: string): Table<T>;
    close(): void;
    drop(name?: string): any;
    authenticate(opts: AuthOptions): Promise<any>;
    get isOpen(): boolean;
}
export default EchoDB;

declare type EchoDBOptions = {
    adapter: DatabaseProvider;
    sync?: SyncOptions;
};

declare type EventOptions = {
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

declare function isBrowser(): Function;

declare function isDate(value: any): boolean;

declare function isFirestoreTimestamp(obj: any): boolean;

declare function isInWorker(): boolean;

declare function isNestedQuery(spec: any): boolean;

declare function isNodejs(): boolean;

declare function isWorkerAvailable(): boolean;

export declare class ListenerCollection {
    _listeners: any[];
    _pre: any[];
    _post: any[];
    _postFail: any[];
    constructor();
    /**
     * Add listener cb at the end of the current chain.
     * @param {String} key
     * @param {Object|Function} context
     * @param {Function} listener
     */
    add(key: string, context: any, listener: Function): void;
    /**
     * Add the listener callback to the particular position in the chain.
     * The position is specified by the index in the array or a condition
     * Example
     * listeners.insert({ pre: "another", post: "another2" }, "foo", this, function() {... });
     *
     * @param {Number|Object} indexOrCondition
     * @param {String} key
     * @param {Object} context
     * @param {Function} listener
     */
    insert(indexOrCondition: any, key: string, context: any, listener: Function): any[];
    /**
     * Remove the listener specified by its key from the collection
     * @param {String} key
     */
    remove(key: string): void;
    pre(fn: Function): void;
    post(fn: Function): void;
    postFail(fn: Function): void;
    /**
     * Fires listeners and returns value composed from all boolean results into the single bool
     * @returns {Promise<Boolean>}
     */
    fireAndJoinResults(): Promise<boolean>;
    /**
     * Fire registered listeners in sequence and returns a promise containing wrapping an array of all
     * individual results.
     * The parameters passed to the fire are forwarded in the same order to the listeners.
     * @returns {Promise<any>}
     */
    fire(...args: any[]): Promise<any>;
}

export declare function loadNetworkProvider(): Promise<any>;

/**
 *
 * ex:
 * {
 *  posts:{
 *    id: {
 *      type: Number,
 *      autoIncrement:true
 *    }
 *    title: String
 *    category:
 *  }
 * }
 * @export
 * @param {any} schemas
 */
export declare function normalizeSchemas(schemas: Schemas): any;

export declare namespace ObjectUtil {
    export {
        wrapObject
    }
}

declare type PopulateObject = {
    localField: string;
    foreignField: string;
    ref: string;
    as?: string;
};

export declare class Schema {
    options?: SchemaOptions;
    raw: string;
    primaryKeyField: string;
    fields: SchemaProps;
    withTimestamp: boolean;
    autoIncrementEnabled: boolean;
    constructor(obj?: SchemaProps, options?: SchemaOptions);
    toMysqlTableQuery(): void;
}

declare type SchemaColumnProps = {
    autoIncrement?: boolean;
    primaryKey?: boolean;
    unique?: boolean;
    type: typeof String | typeof Number | typeof Array | typeof Date | typeof Object;
};

declare type SchemaOptions = {
    timestamp?: boolean;
};

declare type SchemaProps = {
    [name: string]: SchemaColumnProps | typeof String | typeof Number | typeof Array | typeof Date | typeof Object;
};

declare type Schemas = {
    [name: string]: Schema;
};

declare type SyncOptions = {
    url?: string;
    enabled?: boolean;
    connectionType?: string;
    events?: EventOptions;
    adapter?: SyncProvider;
    autoStart?: boolean;
    interval?: number;
};

export declare abstract class SyncProvider extends EventEmitter {
    private _localAdapter;
    dbName: string;
    schemas: any;
    context: EchoDB;
    abstract nextId(name: string): any;
    abstract start(): void;
    abstract stop(): void;
    abstract authenticate(opts: AuthOptions): Promise<any>;
    abstract add(name: string, data: any): Promise<any>;
    abstract update(name: string, condition: any, data: any): Promise<any>;
    abstract remove(name: string, condition: any): Promise<any>;
    abstract drop(name?: string): Promise<any>;
    set localAdapter(val: DatabaseProvider);
    get localAdapter(): DatabaseProvider;
}

declare class Table<T> {
    name: string;
    collection: CollectionProvider<T>;
    constructor(name: string, provider: DatabaseProvider);
    select(q?: string[] | string, ...args: any[]): {
        distinct: (_str: any) => {
            from: <T_1>(tableName: string) => void;
        };
        from: <T_1>(tableName: string) => void;
    };
}

/**
 * Convert schema instance to plain object so it can be send to the webworker
 *
 * @export
 * @param {Schemas} schemas
 * @returns
 */
export declare function toRawObject(schemas: Schemas): any;

export declare namespace traverse {
    export {
        traverseFilter as default
    }
}

/**
 * traverseFilter({
 *
 * })
 * @param obj
 * @param queries
 * @param item
 */
declare function traverseFilter<T>(obj: T, queries: any, item: any): T;

export declare namespace utils {
    export {
        createWorker,
        createWorkerImportScript,
        isDate,
        isWorkerAvailable,
        isNodejs,
        isBrowser,
        workerScriptPath,
        isInWorker,
        isNestedQuery
    }
}

export declare namespace validate {
    export {
        validateSchemaProps,
        validateSchema_2 as validateSchema,
        validatePopulate,
        validatePopulates,
        validateData,
        isFirestoreTimestamp,
        PopulateObject
    }
}

declare function validateData(data: any, schema: any): void;

declare function validatePopulate(obj: object & PopulateObject): void;

declare function validatePopulates(arr: PopulateObject[]): void;

export declare function validateSchema(schemas: any): void;

declare function validateSchema_2(schemas: Record<string, Schema>): void;

declare function validateSchemaProps(keys: Array<string>): void;

declare function workerScriptPath(): string;

declare function wrapObject<T>(obj: any, collection: CollectionProvider<T> | any): T & DocumentObject;

export { }
