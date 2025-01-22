import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { PresenceTable } from '../../components/PresenceTable';

import {
  ISubscribeEntity,
  ISubscribeModel,
} from '../../domain/entities/subscribeEntity';
import { toast } from 'react-toastify';
import { api } from '@/core/lib/axios';
import { Button } from '@/core/components/ui/button';
import { Spinner } from '@/core/components/spinner';

interface IActivityProps {
  name: string;
  responsible: string;
}

export function ActivityPresencePage() {
  const { id } = useParams() as { id: string };
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState<ISubscribeModel[]>([]);
  const [activity, setActivity] = useState<IActivityProps>(
    {} as IActivityProps
  );

  const fetchData = async (activityId: string) => {
    try {
      const values = await Promise.all([
        api.get(`/atividades/${activityId}`),
        api.get(`/atividades/${activityId}/inscricoes`),
      ]);

      const mappedData = values[1].data.map((inscrito: ISubscribeEntity) => ({
        id: inscrito.uuid_user,
        name: inscrito.nome,
        email: inscrito.email,
        presenca: inscrito.presenca,
      }));

      setData(mappedData);
      setActivity({
        name: values[0].data.nome,
        responsible: values[0].data.descricao,
      });
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
        <Spinner />
      ) : (
        <div className='flex flex-col'>
          <div>
            <h2 className='mb-2 text-3xl font-bold tracking-tight'>
              Registrar presença
            </h2>

            <div className='mb-2 flex flex-col gap-1'>
              <span>
                <strong className='text-md font-semibold text-violet-600'>
                  Atividade:{' '}
                </strong>
                {activity.name}
              </span>
              <span>
                <strong className='text-md font-semibold text-violet-600'>
                  Responsáveis:{' '}
                </strong>
                {activity.responsible}
              </span>
            </div>
          </div>
          <div className='rounded-md border'>
            <PresenceTable data={data} atividadeId={id} />
          </div>
          <div className='mt-4 flex justify-end'>
            <Button>Baixar planilha</Button>
          </div>
        </div>
      )}
    </>
  );
}
