import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

import { useEventsContext } from '../../hooks/useEventsContext';
import axiosInstance from '../../../axiosInstance';

import { loadRegistrationsEndpoint } from '../../utils/loadRegistrationsEndpoint';
import {
  ISubscribersEntity,
  StatusPagamento,
} from '../../domain/entities/subscribersEntity';
import { Loading } from '../../../core/components/Loading';
import { Title } from '../../../core/components/Title';
import { EventRegistrationTable } from '../../components/EventRegistrationTable';

export function EventRegistrationPage() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { currentEvent } = useEventsContext();
  const [tableData, setTableData] = useState<ISubscribersEntity[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const { data } = await axiosInstance.get(
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
        <div className='pb-8 md:px-8'>
          <Title title='Credenciamento' />
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