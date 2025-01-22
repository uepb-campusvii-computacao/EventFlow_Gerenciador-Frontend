import { api } from '@/core/lib/axios';

interface IListLotsServiceDataResponse {
  uuid_lote: string;
  uuid_evento: string;
  preco: number;
  nome: string;
  descricao: string | null;
  ativo: boolean;
}

export async function listLotsService(eventId: string) {
  const response = await api.get<IListLotsServiceDataResponse[]>(
    `/events/${eventId}/all/lotes`
  );

  return response.data;
}
