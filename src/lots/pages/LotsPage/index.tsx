import { useEffect, useState } from 'react';
import {
  ILotsEntity,
  ILotsTableDataEntity,
} from '../../domain/entities/lotsEntity';
import { toast } from 'react-toastify';
import { Title } from '../../../core/components/Title';
import { Loading } from '../../../core/components/Loading';
import { loadLotsEndpoint } from '../../utils/loadLotsEndpoint';
import { LotsTable } from '../../components/LotsTable';
import { useEventsContext } from '../../../events/hooks/useEventsContext';
import { api } from '@/core/lib/axios';

export function LotesPage() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [tableData, setTableData] = useState<ILotsTableDataEntity[]>([]);
  const { currentEvent } = useEventsContext();

  useEffect(() => {
    async function fetchData() {
      setIsLoading(true);

      try {
        const lotesResponse = await api.get(
          loadLotsEndpoint(currentEvent.uuid_evento)
        );

        const mappedResponse = lotesResponse.data.map((item: ILotsEntity) => ({
          id: item.uuid_lote,
          nome: item.nome,
          descricao: item.descricao || 'Não disponível',
          preco: item.preco,
          ativo: item.ativo,
        }));

        setTableData(mappedResponse);
      } catch (error) {
        console.error('Erro ao buscar lotes:', error);
        toast.error('Erro ao buscar lotes.');
      } finally {
        setIsLoading(false);
      }
    }

    if (currentEvent) {
      fetchData();
    }
  }, [currentEvent]);

  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        <div className='flex flex-col gap-4'>
          <h2 className='text-3xl font-bold tracking-tight'>Lotes</h2>
          <div className='rounded-md border'>
            <LotsTable data={tableData} />
          </div>
        </div>
      )}
    </>
  );
}
