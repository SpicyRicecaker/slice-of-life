// Data for chart
export interface point {
  x: string;
  y: number;
  dateCreated: Date;
  dateModified: Date;
}
export interface Day {
  date: Date;
  dateCreated: Date;
  dateModified: Date;
  data: point[];
}