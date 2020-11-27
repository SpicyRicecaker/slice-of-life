import { writable, derived } from 'svelte/store';
import { openDB } from 'idb/with-async-ittr.js';

// Chart!
export const doughnut: any = writable({});

// Data for chart
interface point {
  x: string;
  y: number;
  dateCreated: Date;
  dateModified: Date;
}
interface day {
  date: Date;
  dateCreated: Date;
  dateModified: Date;
  data: point[];
}

// Options for chart
export const options = writable({});

// Labels for chart
export const labels = writable(['One', 'Two', 'Three']);

// Create the DB
class db {
  name;
  version;
  db;
  // Db takes in name and version
  constructor(name, version) {
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
  getDb = async () => await this.db;
  // Finds today's date
  getCursorFromDateRange = async (dateBeg: Date, dateEnd: Date) => {
    const dateIdx = await (await this.db)
      .transaction('days', 'readwrite')
      .objectStore('days')
      .index('date');
    // Is there a dataset with todays date?
    return dateIdx.openCursor(IDBKeyRange.bound(dateBeg, dateEnd));
  };
  // Gets cursor of the entire db
  // Keep in mind that this adds ID fields to all objects for some reason
  getCursor = async () => {
    const dateIdx = await (await this.db)
      .transaction('days', 'readwrite')
      .objectStore('days')
    // Is there a dataset with todays date?
    return dateIdx.openCursor();
  };
  // DANGER Clears entire object store
  clear = async (store: string) => {
    const daysStore = await (await this.db).transaction(store, 'readwrite').objectStore(store);
    daysStore.clear();
  }
  // Push object to found cursor...
  // REMOVE The loop doesn't make sense
  insertObjectInCursor = async (cursor: any, obj: any) => {
    for await (const date of cursor) {
      date.value.data.push(obj);
      cursor.update(date.value);
    }
  };
  // Puts one object in the database
  insertObjectInDatabase = async (obj) => {
    (await this.db).add('days', obj);
  };
}
export const daysDb = new db('days-store', 1);

const initStuff: day[] = [];

const getBeginning = (date: Date) => date.setHours(0, 0, 0, 0);
const getEnd = (date: Date) => date.setHours(23, 59, 59, 999);

export const today = writable(new Date());
export const todayPre = derived(
  today,
  ($today) => new Date(getBeginning($today))
);
export const todayPost = derived(today, ($today) => new Date(getEnd($today)));

// Create the data array
const createDays = (initStuff: day[]) => {
  const { subscribe, set, update } = writable(initStuff);

  return {
    subscribe,
    set,
    splice: async (index: number) => {
      // Clear the array, and the database at this specific date
    },
    push: async (day: day) => {
      //
    },
  };
};

export const days = createDays(initStuff);
