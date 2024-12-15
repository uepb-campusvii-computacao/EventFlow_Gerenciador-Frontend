export const getParticipantDataEndpoint = (
  event_id: string,
  user_id: string
) => {
  return `/events/${event_id}/inscricao/${user_id}`;
};
