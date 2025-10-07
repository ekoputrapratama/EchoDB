import isObject from 'lodash/isObject';

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
}
export type SchemaProps = {
  [name: string]:
    | SchemaColumnProps
    | typeof String
    | typeof Number
    | typeof Array
    | typeof Date
    | typeof Object;
}
export type Schemas = {
  [name: string]: Schema;
}
export type SchemaOptions = {
  timestamp?: boolean;
}

const types = [String, Object, Array, Number, Date];
const validSchemaProperty = [
  'unique',
  'primaryKey',
  'autoIncrement',
  'type',
  'index',
];

function validateSchemaProps(keys: string[]) {
  keys.forEach((key) => {
    if (!validSchemaProperty.includes(key)) {
      throw new Error(`property ${key} is not a known property`);
    }
  });
}

function addKey(schema: string, column: string, unique?: boolean) {
  if (unique) return schema + `&${column},`;
  else return schema + `${column},`;
}

function addPrimaryKey(schema: string, column: string, autoIncrement: boolean) {
  if (autoIncrement) return schema + `++${column},`;
  else return schema + `${column},`;
}

function objectToSchemaString(columns: SchemaProps) {
  let schema = '';
  let havePrimaryKey = false;
  let primaryKeyColumn;
  let autoIncrement = false;
  const indexes = [];
  for (const column in columns) {
    const typeOrProps: any = columns[column];
    if (!types.includes(typeOrProps) && isObject(typeOrProps)) {
      const keys = Object.keys(typeOrProps);
      validateSchemaProps(keys);
      if (keys.includes('type') && !types.includes(typeOrProps['type']))
        throw new Error(`type ${typeOrProps['type']} is not a known type`);
      if (keys.includes('index')) {
        indexes.push(column);
      }
      if (keys.includes('primaryKey') || keys.includes('autoIncrement')) {
        if (havePrimaryKey)
          throw new Error(`only 1 primaryKey can be defined for each schema`);
        if (keys.includes('autoIncrement') && !keys.includes('primaryKey'))
          throw new Error(`only primaryKey can use autoIncrement property`);

        schema = addPrimaryKey(schema, column, keys.includes('autoIncrement'));
        primaryKeyColumn = column;

        if (keys.includes('primaryKey')) havePrimaryKey = true;
        if (keys.includes('autoIncrement')) autoIncrement = true;
        continue;
      }
      if (keys.includes('unique')) {
        schema = addKey(schema, column, true);
        continue;
      }
    } else {
      if (!types.includes(typeOrProps))
        throw new Error(`type ${typeOrProps} is not a known type`);

      schema = addKey(schema, column, false);
    }
  }
  if (!havePrimaryKey) {
    schema = '++_id,' + schema;
    primaryKeyColumn = '_id';
  }
  if (schema.endsWith(',')) schema = schema.slice(0, schema.length - 1);
  schema = reorderSchema(schema, primaryKeyColumn);
  schema = buildCompoundIndex(schema, primaryKeyColumn, indexes);
  return { schema, primaryKeyColumn, autoIncrement };
}

function buildCompoundIndex(schema: string, primaryKeyColumn, indexes: any[]) {
  const splitted = schema.split(',');
  let compound = '';
  if (indexes.length > 0) {
    indexes.unshift(primaryKeyColumn);
    compound = `[${indexes.join('+')}]`;
    splitted.push(compound);
    return splitted.join(',');
  } else {
    return schema;
  }
}

function reorderSchema(schema: string, primaryKeyColumn: string) {
  const splitted = schema.split(',');
  let i = 0;
  for (const field of splitted) {
    if ((field.includes('++') || field === primaryKeyColumn) && i !== 0) {
      if (splitted[0].includes('++') || splitted[0] === primaryKeyColumn) {
        throw new Error(`multiple primaryKey is not supported`);
      }
      splitted.move(i, 0);
    } else if (field === primaryKeyColumn && i !== 0) {
      splitted.move(i, 0);
    }
    i++;
  }
  return splitted.join(',');
}
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
export function normalize(schemas: Schemas): any {
  const results = {};
  for (const schemaName in schemas) {
    const schema: Schema = schemas[schemaName];
    results[schemaName] = schema.raw;
  }
  return results;
}

export function validateSchema(schemas) {
  for (const key in schemas) {
    if (!(schemas[key] instanceof Schema)) {
      throw new Error(`${key} schema is not valid`);
    }
  }
}

/**
 * Convert schema instance to plain object so it can be send to the webworker
 *
 * @export
 * @param {Schemas} schemas
 * @returns
 */
export function toRawObject(schemas: Schemas): any {
  const results = {};
  for (const schema in schemas) {
      results[schema] = {
      raw: schemas[schema].raw,
      primaryKeyField: schemas[schema].primaryKeyField,
      options: schemas[schema].options,
      fields: Object.keys(schemas[schema].fields),
      autoIncrementEnabled: schemas[schema].autoIncrementEnabled,
    };
  }
  return results;
}

export default class Schema {
  raw: string;
  primaryKeyField: string;
  fields: SchemaProps;
  withTimestamp: boolean;
  autoIncrementEnabled: boolean;
  constructor(
    obj?: SchemaProps,
    public options?: SchemaOptions
  ) {
    if (arguments.length > 0) {
      if (!options || options.timestamp !== false) {
        options = Object.assign({}, options, {
          timestamp: true,
        });
      }
      if (options.timestamp) {
        obj.createdAt = Date;
        obj.updatedAt = Date;
        this.withTimestamp = true;
      }
      this.fields = obj;
      const schm = objectToSchemaString(obj);
      this.raw = schm.schema;
      this.autoIncrementEnabled = schm.autoIncrement;
      this.primaryKeyField = schm.primaryKeyColumn;
    }
  }
  // TODO
  toMysqlTableQuery() {}
}
