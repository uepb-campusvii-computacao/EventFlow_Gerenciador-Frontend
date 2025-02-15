import { api } from '@/core/lib/axios';

export async function toggleLot(lotId: string) {
  const response = await api.put(`/lote/${lotId}/change_inscricoes_visibility`);

  return response;
}
