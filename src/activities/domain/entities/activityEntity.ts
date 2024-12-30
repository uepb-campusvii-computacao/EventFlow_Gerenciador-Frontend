export enum TypeOfActivityEnum {
  MINICURSO = 'MINICURSO',
  WORKSHOP = 'WORKSHOP',
  OFICINA = 'OFICINA',
  PALESTRA = 'PALESTRA',
}

export interface IActivityEntity {
  activityId: string;
  name: string;
  typeOfActivity: TypeOfActivityEnum;
  maxParticipants: number;
  registrationCount: number;
}

export interface IActivityDataEditFormEntity {
  name: string;
  typeOfActivity: TypeOfActivityEnum;
  maxParticipants: number;
  registrationCount: number;
}
