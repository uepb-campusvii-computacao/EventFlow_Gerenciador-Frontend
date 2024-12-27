import { env } from '@/env';

export const loadToggleRegistrationEndpoint = (
  id_evento: string,
  user_id: string
) => {
  return `${env.VITE_API_URL}/events/${id_evento}/inscricoes/credenciamento/${user_id}`;
};
