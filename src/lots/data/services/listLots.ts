import { api } from '@/core/lib/axios';

import { ILotsEntity } from '@/lots/domain/entities/lotsEntity';

export async function listLotsService(eventId: string) {
  const response = await api.get<ILotsEntity[]>(`/events/${eventId}/all/lotes`);

  return response.data;
}
