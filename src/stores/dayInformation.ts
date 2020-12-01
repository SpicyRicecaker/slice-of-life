import type { Day } from '../typings/types';
import { writable, derived } from 'svelte/store';

class dayInformation {
  today: Date;
  morning: Date;
  night: Date;
  constructor() {
    this.today = new Date();
    this.morning = dayInformation.getBeginning(this.today);
    this.night = dayInformation.getEnd(this.today);
  }
  // Static methods for getting the initial and end of each day
  static getBeginning = (date: Date): Date =>
    new Date(date.setHours(0, 0, 0, 0));
  static getEnd = (date: Date): Date =>
    new Date(date.setHours(23, 59, 59, 999));
  // Update morning and night each day
  update = () => {
    this.morning = dayInformation.getBeginning(this.today);
    this.night = dayInformation.getEnd(this.today);
  };
  // Getters for all 3
  getToday = (): Date => this.today;
  getMorning = (): Date => this.morning;
  getNight = (): Date => this.night;
  // Setter for today
  setToday = (today: Date) => {
    this.today = today;
    this.update();
  };
  setTodayDay = (date: number) => {
    this.today.setDate(date);
    this.update();
  }
}
export const today = writable(new dayInformation());

// export const today = writable(new Date());
// export const todayPre = derived(
//   today,
//   ($today) => new Date(getBeginning($today))
// );
// export const todayPost = derived(today, ($today) => new Date(getEnd($today)));

// Create the data array
//
// const initStuff: Day[] = [];
