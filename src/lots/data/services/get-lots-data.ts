import { api } from '@/core/lib/axios';

interface IGetLotsDataResponse {
  uuid_lote: string;
  uuid_evento: string;
  preco: number;
  nome: string;
  descricao: string | null;
  ativo: boolean;
}

export async function getLotsData(eventId: string) {
  const response = await api.get<IGetLotsDataResponse[]>(
    `/events/${eventId}/all/lotes`
  );

  return response.data;
}
