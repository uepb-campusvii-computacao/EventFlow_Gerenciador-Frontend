export interface ILotsEntity {
  uuid_lote: string;
  uuid_evento: string;
  nome: string;
  descricao: string | null;
  preco: number;
  ativo: boolean;
}

export interface ILotsTableDataEntity {
  id: string;
  nome: string;
  descricao: string;
  preco: number;
  ativo: boolean;
}
