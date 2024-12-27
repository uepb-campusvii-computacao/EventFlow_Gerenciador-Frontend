import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { Loading } from '../../../core/components/Loading';
import { Title } from '../../../core/components/Title';
import { PresenceTable } from '../../components/PresenceTable';

import {
  ISubscribeEntity,
  ISubscribeModel,
} from '../../domain/entities/subscribeEntity';
import { toast } from 'react-toastify';
import { api } from '@/core/lib/axios';

export function ActivityPresencePage() {
  const { id } = useParams() as { id: string };
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState<ISubscribeModel[]>([]);

  const fetchData = async (activityId: string) => {
    try {
      const response = await api.get(`/atividades/${activityId}/inscricoes`);

      const mappedData = response.data.map((inscrito: ISubscribeEntity) => ({
        id: inscrito.uuid_user,
        name: inscrito.nome,
        email: inscrito.email,
        presenca: inscrito.presenca,
      }));

      setData(mappedData);
    } catch (error) {
      toast.error('Erro ao buscar atividades.');
    }
    setIsLoading(false);
  };

  useEffect(() => {
    if (id) {
      fetchData(id);
    }
  }, [id]);

  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        <div className='pb-8 md:px-8'>
          <Title title='Registrar Presença' />
          <PresenceTable data={data} atividadeId={id} />
        </div>
      )}
    </>
  );
}
