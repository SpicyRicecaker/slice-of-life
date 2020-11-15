import { writable } from 'svelte/store';
import { openDB, deleteDB } from 'idb';

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

export const daysDB: any = writable([]);

// Options for chart
export const options = writable({});

// Labels for chart
export const labels = writable(['One', 'Two', 'Three']);

const createDB = async () => {
  console.log('created days db');
  return await openDB('days');
};

// Creating the DB
export const db = createDB();

// Create the data array
const createDays = () => {
  const { subscribe, set, update } = writable([]);

  return {
    subscribe,
    set,
    splice: (index: number) => {
      // Clear the array, and the database at this specific date
    },
    push: (day: day) => {

    }
  };
};

export const days = createDays();
