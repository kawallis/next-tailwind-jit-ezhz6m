export type Class = {
  id: string;
  title: string;
  type: ClassType;
  startDate: string; // this would be date object
  time: string;
  recurring: boolean;
  day: Day;
  booked: boolean; // would be a computed field that returns true or false on wether or not the user that made the post has reserved their spot in the class
  instructor: Instructor;
};

export type Instructor = {
  id: string;
  firstName: string;
  lastName: string;
  image: string;
};

export enum Day {
  Mondays = 'Mondays',
  Tuesdays = 'Tuesdays'
  // ...etc
}

export enum ClassType {
  Writing = 'Writing'
  // ...etc
}
