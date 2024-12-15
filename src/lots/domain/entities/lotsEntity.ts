export interface ILotsEntity {
  uuid_lote: string;
  nome: string;
  descricao: string;
  preco: number;
  ativo: boolean;
}

export interface ILotsTableDataEntity {
  id: string
  nome: string;
  descricao: string;
  preco: number;
  ativo: boolean;
}
