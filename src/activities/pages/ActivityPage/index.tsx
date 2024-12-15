import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

import { loadGetActivitiesData } from '../../utils/loadGetActivitiesData';
import { Loading } from '../../../core/components/Loading';
import { Title } from '../../../core/components/Title';
import { ActivityTable } from '../../components/ActivityTable';

import { useEventsContext } from '../../../events/hooks/useEventsContext';
import axiosInstance from '../../../axiosInstance';
import { IActivityEntity } from '../../domain/entities/activityEntity';

export function ActivityPage() {
  const [isLoading, setIsLoading] = useState(true);
  const [tableData, setTableData] = useState<IActivityEntity>(
    {} as IActivityEntity
  );
  const { currentEvent } = useEventsContext();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axiosInstance.get(
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
        <div className='pb-8 md:px-8'>
          <Title title='Atividades' />
          <ActivityTable data={tableData} />
        </div>
      )}
    </>
  );
}
