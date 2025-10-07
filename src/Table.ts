/* eslint-disable @typescript-eslint/no-unused-vars */
import DatabaseProvider, { CollectionProvider } from "./DatabaseProvider";

export default class Table<T> {
  collection: CollectionProvider<T>;
  constructor(public name: string, provider: DatabaseProvider) {
    this.collection = provider.collection<T>(name);
  }

  
  select(q?: string[] | string, ...args) {
    // const args = arguments;
    // const table = new Table(this.firestore);
    if (args.length === 1) {
      // eslint-disable-next-line no-empty
      if (typeof q === 'string' && q === '*') {

      } else if (typeof q === 'string') {
        q = q.split(',').map(str => str.replace(' ', ''));
      }
    // eslint-disable-next-line no-empty
    } else if (args.length > 1) {

    }
    return {
      distinct: (_str: any) => {

        return {
          from: <T>(tableName: string) => {

            // return table.setTableName(tableName)
          }
        }
      },
      from: <T>(tableName: string) => {
        // return new Table(this.firestore, tableName);
      }
    }
  }
}