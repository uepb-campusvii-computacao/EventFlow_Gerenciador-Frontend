import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

import { useEventsContext } from '../../hooks/useEventsContext';

import { loadRegistrationsEndpoint } from '../../utils/loadRegistrationsEndpoint';
import {
  ISubscribersEntity,
  StatusPagamento,
} from '../../domain/entities/subscribersEntity';
import { Loading } from '../../../core/components/Loading';
import { EventRegistrationTable } from '../../components/EventRegistrationTable';
import { api } from '@/core/lib/axios';

export function EventRegistrationPage() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { currentEvent } = useEventsContext();
  const [tableData, setTableData] = useState<ISubscribersEntity[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const { data } = await api.get(
          loadRegistrationsEndpoint(currentEvent.uuid_evento)
        );

        const mappedResponse = data.all_subscribers.map(
          (item: ISubscribersEntity) => {
            return {
              uui_user: item.uuid_user,
              nome: item.nome,
              nome_cracha: item.nome_cracha,
              email: item.email,
              status_pagamento: item.status_pagamento,
              credenciamento: item.credenciamento,
            };
          }
        );
        setTableData(mappedResponse);
      } catch (error) {
        console.error('Erro ao buscar inscritos:', error);
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
          <h2 className='text-3xl font-bold tracking-tight'>Credenciamentos</h2>
          <EventRegistrationTable
            data={tableData.filter(
              item =>
                item.status_pagamento === StatusPagamento.REALIZED ||
                item.status_pagamento === StatusPagamento.FREE
            )}
          />
        </div>
      )}
    </>
  );
}
