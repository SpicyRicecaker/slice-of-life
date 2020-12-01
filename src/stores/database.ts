import { IDBPCursorWithValue, IDBPDatabase, openDB } from 'idb/with-async-ittr.js';
import type { Day } from '../typings/types';
// Create the DB
class db {
  name: string;
  version: number;
  db: Promise<IDBPDatabase>;
  // Db takes in name and version
  constructor(name: string, version: number) {
    // Update the name and version with new values
    this.name = name;
    this.version = version;

    // Next open the database
    this.db = openDB(name, version, {
      // Upgrade the database to the latest version as needed
      upgrade(db) {
        // By default create a days object store
        const store = db.createObjectStore('days', {
          // The 'id' property of the object will be the key.
          keyPath: 'id',
          // If it isn't explicitly set, create a value by auto incrementing. (i.e. autogenerate keys for id)
          autoIncrement: true,
        });
        // Create an index on the 'date' property of the objects.
        store.createIndex('date', 'date');
      },
    });
  }
  // REMOVE Return self (really shouldn't be a thing)
  getDb = async ():Promise<IDBPDatabase> => this.db;
  // Finds today's date
  getCursorFromDateRange = async (dateBeg: Date, dateEnd: Date): Promise<IDBPCursorWithValue<unknown, ["days"], "days", unknown> | null> => {
    const dateIdx = await (await this.db)
      .transaction('days', 'readwrite')
      .objectStore('days')
      .index('date');
    // Is there a dataset with todays date?
    return dateIdx.openCursor(IDBKeyRange.bound(dateBeg, dateEnd));
  };
  // Gets cursor of the entire db
  // Keep in mind that this adds ID fields to all objects for some reason
  getCursor = async (): Promise<IDBPCursorWithValue<unknown, ["days"], "days", unknown> | null> => {
    const dateIdx = await (await this.db)
      .transaction('days', 'readwrite')
      .objectStore('days');
    // Is there a dataset with todays date?
    return dateIdx.openCursor();
  };
  // DANGER Clears entire object store
  clear = async (store: string) => {
    const daysStore = await (await this.db)
      .transaction(store, 'readwrite')
      .objectStore(store);
    daysStore.clear();
  };
  // Push object to found cursor...
  // REMOVE The loop doesn't make sense
  insertObjectInCursor = async (cursor: any, obj: Day) => {
    for await (const date of cursor) {
      date.value.data.push(obj);
      cursor.update(date.value);
    }
  };
  // Puts one object in the database
  insertObjectInDatabase = async (obj: Day) => {
    (await this.db).add('days', obj);
  };
}
export const daysDb = new db('days-store', 1);