import { writable } from 'svelte/store';
import { openDB, deleteDB } from 'idb/with-async-ittr.js';

// Chart!
export const doughnut: any = writable({});

// Data for chart
interface point {
  x: string;
  y: number;
}
interface day {
  date: Date;
  data: point[];
}

// Options for chart
export const options = writable({});

// Labels for chart
export const labels = writable(['One', 'Two', 'Three']);

// Creating the DB
export const dbPromise = openDB('days-store', 1, {
  upgrade(db) {
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

const initStuff:day[] = [];

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

export const today = writable(new Date())

export const days = createDays(initStuff);