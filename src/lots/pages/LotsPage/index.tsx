import { useQuery } from '@tanstack/react-query';

import { LotsTable } from '../../components/LotsTable';
import { useEventsContext } from '../../../events/hooks/useEventsContext';
import { Title } from '@/core/components/ui/title';
import { Spinner } from '@/core/components/spinner';
import { listLotsService } from '@/lots/data/services/listLots';

export function LotesPage() {
  const { currentEvent } = useEventsContext();

  const { data: lotsData, isLoading } = useQuery({
    queryKey: ['lots-data'],
    queryFn: () => listLotsService(currentEvent.uuid_evento),
  });

  return (
    <>
      {isLoading ? (
        <div className='m-auto flex items-center justify-center'>
          <Spinner />
        </div>
      ) : (
        <div className='flex flex-col gap-4'>
          <Title>Lotes</Title>

          {lotsData && (
            <div className='rounded-md border'>
              <LotsTable data={lotsData} />
            </div>
          )}
        </div>
      )}
    </>
  );
}
