import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

import { useEventsContext } from '../../hooks/useEventsContext';
import { loadSubscribersEndpoint } from '../../utils/loadSubscribersEndpoint';
import { Loading } from '../../../core/components/Loading';
import { EventSubscribersTable } from '../../components/EventSubscribersTable';
import { api } from '@/core/lib/axios';
import { EventSubscribersTableFilters } from '@/events/components/EventSubscribersTable/event-subscribers-table-filters';
import { Title } from '@/core/components/ui/title';

export function EventSubscribersPage() {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [tableData, setTableData] = useState([]);
  const { currentEvent } = useEventsContext();

  useEffect(() => {
    async function fetchData(
      setTableData: (data: any) => void,
      setIsLoading: (value: boolean) => void
    ) {
      setIsLoading(true);

      try {
        const inscricoesResponse = await api.get(
          loadSubscribersEndpoint(currentEvent.uuid_evento)
        );

        setTableData(inscricoesResponse.data.all_subscribers);
      } catch (error) {
        console.error('Erro ao buscar inscritos:', error);
        toast.error('Erro ao buscar inscritos.');
      } finally {
        setIsLoading(false);
      }
    }

    fetchData(setTableData, setIsLoading);
  }, [currentEvent]);

  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        <div className='flex flex-col gap-4'>
          <Title>Inscritos</Title>

          <EventSubscribersTableFilters />

          <EventSubscribersTable data={tableData} />

          <div className='flex w-full items-center justify-center px-8 py-3'>
            {/* <Pagination
              usersPerPage={state.usersPerPage}
              totalUsers={state.users.length}
              paginateFront={paginateFront}
              paginateBack={paginateBack}
              currentPage={state.currentPage}
              paginateToggle={paginateToggle}
            /> */}
          </div>
        </div>
      )}
    </>
  );
}
