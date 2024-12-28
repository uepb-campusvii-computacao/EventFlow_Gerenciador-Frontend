import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

import { loadGetActivitiesData } from '../../utils/loadGetActivitiesData';
import { Loading } from '../../../core/components/Loading';
import { ActivityTable } from '../../components/ActivityTable';

import { useEventsContext } from '../../../events/hooks/useEventsContext';
import { IActivityEntity } from '../../domain/entities/activityEntity';
import { api } from '@/core/lib/axios';

export function ActivityPage() {
  const [isLoading, setIsLoading] = useState(true);
  const [tableData, setTableData] = useState<IActivityEntity>(
    {} as IActivityEntity
  );
  const { currentEvent } = useEventsContext();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await api.get(
          loadGetActivitiesData(currentEvent.uuid_evento)
        );

        setTableData(data);
      } catch (error) {
        toast.error('Erro ao buscar inscritos.');
      }
      setIsLoading(false);
    };

    fetchData();
  }, [currentEvent]);

  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        <div className='flex flex-col gap-4'>
          <h2 className='text-3xl font-bold tracking-tight'>Atividades</h2>
          <ActivityTable data={tableData} />
        </div>
      )}
    </>
  );
}
