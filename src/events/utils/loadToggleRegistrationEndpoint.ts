import { BACKEND_DEFAULT_URL } from '../../backendPaths';

export const loadToggleRegistrationEndpoint = (
  id_evento: string,
  user_id: string
) => {
  return `${BACKEND_DEFAULT_URL}/events/${id_evento}/inscricoes/credenciamento/${user_id}`;
};
