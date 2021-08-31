import { writable } from 'svelte/store';

import { Chart } from 'chart.js';
import type { ChartConfiguration } from 'chart.js';

import type { Day } from '../typings/types';

class Doughnut {
  chart: Chart | null
  constructor() {
    this.chart = null
  }
  initalize(ctx: CanvasRenderingContext2D, opts: ChartConfiguration) {
    this.chart = new Chart(ctx, opts)
  }
  update() {
    this.chart?.update()
  }
}

export const doughnut = new Doughnut()

// Options for chart
export const options = writable({
  plugins: {
    legend: {
      display: false,
    },
  }
});

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
