// Data for chart
export interface Point {
  x: string;
  y: number;
  dateCreated: Date;
  dateModified: Date;
}
export interface Day {
  date: Date;
  dateCreated: Date;
  dateModified: Date;
  data: Point[];
}