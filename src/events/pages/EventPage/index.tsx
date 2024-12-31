import { Title } from '@/core/components/ui/title';
import { EventTable } from '../../components/EventTable';

export function EventPage() {
  return (
    <div className='flex flex-col gap-4'>
      <Title>Eventos</Title>

      <div className='rounded-md border'>
        <EventTable />
      </div>
    </div>
  );
}
