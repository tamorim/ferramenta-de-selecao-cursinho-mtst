import {
  Disability,
  Race,
  Income,
  Education,
  Highschool,
  CourseLocation,
  SaturdayAvailability,
  MemberOfOccupation,
} from "./constants";

export type FileHeaders = [
  dateTimeStamp: string,
  email: string,
  name: string,
  socialName: string,
  cpf: string,
  rg: string,
  birthDate: string,
  hasDisability: Disability,
  race: Race,
  income: Income,
  education: Education | string,
  highschool: Highschool | string,
  schoolName: string,
  address: string,
  zipCode: string,
  whatsApp: string,
  courseLocation: CourseLocation,
  saturdayAvailability: SaturdayAvailability,
  isMemberOfOccupation: MemberOfOccupation,
  occupationName: string,
];

export type Row = [
  person: string,
  address: string,
  distance: google.maps.Distance | undefined,
  duration: google.maps.Duration | undefined,
];
