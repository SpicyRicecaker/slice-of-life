import { writable } from 'svelte/store';
import type { Day } from '../typings/types';

// Chart!
export const doughnut: any = writable({});

// Options for chart
export const options = writable({});

// Labels for chart
export const labels = writable(['One', 'Two', 'Three']);

const createDays = (initStuff: Day[]) => {
  const { subscribe, set, update } = writable(initStuff);

  return {
    subscribe,
    set,
    splice: async (index: number) => {
      // Clear the array, and the database at this specific date
    },
    push: async (day: Day) => {
      //
    },
  };
};

export const days = createDays([]);
