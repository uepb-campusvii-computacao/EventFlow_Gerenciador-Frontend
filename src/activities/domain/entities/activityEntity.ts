export enum TypeActivity {
  MINICURSO = 'MINICURSO',
  WORKSHOP = 'WORKSHOP',
  OFICINA = 'OFICINA',
  PALESTRA = 'PALESTRA',
}

export interface minicurso {
  nome: string;
  max_participants: number;
  tipo_atividade: TypeActivity.MINICURSO;
  uuid_atividade: string;
}

export interface workshop {
  nome: string;
  max_participants: number;
  tipo_atividade: TypeActivity.WORKSHOP;
  uuid_atividade: string;
}
export interface oficina {
  nome: string;
  max_participants: number;
  tipo_atividade: TypeActivity.OFICINA;
  uuid_atividade: string;
}
export interface palestra {
  nome: string;
  max_participants: number;
  tipo_atividade: TypeActivity.PALESTRA;
  uuid_atividade: string;
}

export interface IActivityEntity {
  minicurso: minicurso[];
  workshop: workshop[];
  oficina: oficina[];
  palestra: palestra[];
}

export interface IActivityDataEditFormEntity {
  nome: string;
  descricao: string;
  tipo_atividade: TypeActivity;
  max_participants: number;
}
