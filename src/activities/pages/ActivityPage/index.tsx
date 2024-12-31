import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

import { loadGetActivitiesData } from '../../utils/loadGetActivitiesData';
import { Loading } from '../../../core/components/Loading';
import { ActivityTable } from '../../components/ActivityTable';

import { useEventsContext } from '../../../events/hooks/useEventsContext';
import { api } from '@/core/lib/axios';
import { ActivityTableFilters } from '@/activities/components/ActivityTable/activity-table-filters';
import { IActivityEntity } from '@/activities/domain/entities/activityEntity';
import { Pagination } from '@/core/components/ui/pagination';

interface IActivityPageState {
  data: IActivityEntity[];
  isLoading: boolean;
  currentPage: number;
  usersPerPage: number;
  filterOpen: boolean;
  filter: string;
}

export function ActivityPage() {
  const [isLoading, setIsLoading] = useState(true);
  const { currentEvent } = useEventsContext();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await api.get(
          loadGetActivitiesData(currentEvent.uuid_evento)
        );

        setState(prevState => ({
          ...prevState,
          data,
        }));
      } catch (error) {
        toast.error('Erro ao buscar inscritos.');
      }
      setIsLoading(false);
    };

    fetchData();
  }, [currentEvent]);

  const [state, setState] = useState<IActivityPageState>({
    data: [],
    currentPage: 1,
    usersPerPage: 20,
    filter: '',
    filterOpen: false,
    isLoading: false,
  });

  const indexOfLastUser = state.currentPage * state.usersPerPage;
  const indexOfFirstUser = indexOfLastUser - state.usersPerPage;
  // const currentUsers = state.data.slice(indexOfFirstUser, indexOfLastUser);

  const paginateFront = () => {
    if (indexOfLastUser < state.data.length) {
      setState(prevState => ({
        ...prevState,
        currentPage: prevState.currentPage + 1,
      }));
    }
  };

  const paginateBack = () => {
    if (state.currentPage > 1) {
      setState(prevState => ({
        ...prevState,
        currentPage: prevState.currentPage - 1,
      }));
    }
  };

  const paginateToggle = (page_number: number) => {
    setState(prevState => ({
      ...prevState,
      currentPage: page_number,
    }));
  };

  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        <div className='flex flex-col gap-4'>
          <h2 className='text-3xl font-bold tracking-tight'>Atividades</h2>
          <div className='space-y-2'>
            <ActivityTableFilters />

            <ActivityTable data={state.data} />

            <Pagination
              usersPerPage={state.usersPerPage}
              totalUsers={state.data.length}
              paginateFront={paginateFront}
              paginateBack={paginateBack}
              currentPage={state.currentPage}
              paginateToggle={paginateToggle}
            />
          </div>
        </div>
      )}
    </>
  );
}
