import { writable, readable } from 'svelte/store';

class dayInformation {
  today: Date;
  morning: Date;
  night: Date;
  constructor() {
    this.today = new Date();
    this.morning = dayInformation.getBeginning(this.today);
    this.night = dayInformation.getEnd(this.today);
    // this.increment();
  }
  // Static methods for getting the initial and end of each day
  static getBeginning = (date: Date): Date => {
    const d = new Date(date);
    d.setHours(0, 0, 0, 0);
    return d;
  };

  static getEnd = (date: Date): Date => {
    const d = new Date(date);
    d.setHours(23, 59, 59, 999);
    return d;
  };
  // Update morning and night each day
  updateTimes = () => {
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
    this.updateTimes();
  };
  setTodayDay = (date: number) => {
    this.today.setDate(date);
    this.updateTimes();
  };
  // increment = () => {
  //   console.log('calling increment bb');
  //   this.setToday(new Date());
  //   setTimeout(this.increment, 1000);
  // };
}
export const today = writable(new dayInformation());

export const time = readable(new Date(), (set) => {
  const loop = () => {
    set(new Date());
    setTimeout(loop, 60000);
  };
  loop();
});
