import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { useEventsContext } from '../../hooks/useEventsContext';
import { loadSubscribersEndpoint } from '../../utils/loadSubscribersEndpoint';
import { ISubscribersEntity } from '../../domain/entities/subscribersEntity';
import { Loading } from '../../../core/components/Loading';
import { Title } from '../../../core/components/Title';
import { EventSubscribersTable } from '../../components/EventSubscribersTable';
import { api } from '@/core/lib/axios';

export function EventSubscribersPage() {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [tableData, setTableData] = useState([]);
  const { currentEvent } = useEventsContext();

  function gerarMapaDeCores(lotes: string[]) {
    const cores = [
      'text-black',
      'text-green-500',
      'text-red-500',
      'text-blue-500',
      'text-yellow-500',
    ]; // Adicione mais cores conforme necessário
    const coresMap = {};
    lotes.forEach((lote, index) => {
      coresMap[lote] = cores[index % cores.length]; // corrigir erro de any aqui
    });
    return coresMap;
  }

  function gerarCorTexto(uuid_lote_atual: string, coresMap: any) {
    return coresMap[uuid_lote_atual] || 'text-gray-500';
  }

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

        const uuid_lotes = inscricoesResponse.data.all_subscribers.map(
          (item: ISubscribersEntity) => item.uuid_lote
        );
        const lotes = [...new Set(uuid_lotes)];

        const coresMap = gerarMapaDeCores(lotes);

        const mappedResponse = inscricoesResponse.data.all_subscribers.map(
          (item: ISubscribersEntity) => {
            const cor_texto = gerarCorTexto(item.uuid_lote, coresMap);
            return {
              uui_user: item.uuid_user,
              nome: item.nome,
              nome_cracha: item.nome_cracha,
              email: item.email,
              status_pagamento: item.status_pagamento,
              credenciamento: item.credenciamento,
              cor_texto,
            };
          }
        );

        setTableData(mappedResponse);
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
        <div className='pb-8 md:px-8'>
          <Title title='Inscrições' />
          <EventSubscribersTable data={tableData} />
        </div>
      )}
    </>
  );
}
