import { writable } from 'svelte/store';

// Chart!
export const doughnut:any = writable({});

// Data for chart
interface point {
  x: string;
  y: number;
}
interface day {
  date: Date;
  data: point[];
}
interface year {
  days: day[];
}
export const year = writable({
  days: [
    {
      date: new Date('123'),
      data: [{ x: 'HELLO', y: 0.04 }],
    },
  ],
});
// Options for chart
export const options = writable({});

// Labels for chart
export const labels = writable([]);
