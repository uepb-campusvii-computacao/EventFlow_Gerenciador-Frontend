import { api } from '@/core/lib/axios';

interface getDashboardResponse {
  total_inscritos: number;
  total_credenciados: number;
  total_arrecadado: {
    totalArrecadadoInscricoes: number;
    totalArrecadadoVendas: number;
  };
  inscricoes_pendentes: number;
  inscricoes_gratuitas: number;
}

export async function getDashboardData(eventId: string) {
  const response = await api.get<getDashboardResponse>(
    `/events/${eventId}/dashboard`
  );

  return response.data;
}
