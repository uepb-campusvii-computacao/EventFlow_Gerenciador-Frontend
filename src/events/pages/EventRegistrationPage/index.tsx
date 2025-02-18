import { useQuery } from '@tanstack/react-query';

import { EventRegistrationTableFilters } from '@/events/components/EventRegistrationTable/event-registration-table-filters';
import { Title } from '@/core/components/ui/title';
import { Spinner } from '@/core/components/spinner';
import { StatusPagamento } from '../../domain/entities/subscribersEntity';
import { EventRegistrationTable } from '../../components/EventRegistrationTable';
import { listRegistrationUsers } from '@/events/data/services/listRegistrationUsers';
import { useEventsContext } from '../../hooks/useEventsContext';

export function EventRegistrationPage() {
  const { currentEvent } = useEventsContext();

  const {
    data: registrationData,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ['list-registrations-data'],
    queryFn: () => listRegistrationUsers(currentEvent.uuid_evento),
  });

  if (isLoading) return <Spinner />;
  if (isError) return 'Ocorreu um erro inesperado!';

  return (
    <div className='flex flex-col gap-4'>
      <Title>Credenciamentos</Title>

      {registrationData && (
        <div className='space-y-2'>
          <EventRegistrationTableFilters />
          <EventRegistrationTable
            data={registrationData.filter(
              item =>
                item.status_pagamento === StatusPagamento.REALIZED ||
                item.status_pagamento === StatusPagamento.FREE
            )}
          />
        </div>
      )}
    </div>
  );
}
