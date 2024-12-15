export enum StatusPagamento {
  PENDING = 'PENDENTE',
  REALIZED = 'REALIZADO',
  EXPIRED = 'EXPIRADO',
  FREE = 'GRATUITO',
}

export interface ISubscribersEntity {
  uuid_user: string;
  nome: string;
  nome_cracha: string;
  email: string;
  uuid_lote: string;
  status_pagamento: StatusPagamento;
  credenciamento: boolean;
}
