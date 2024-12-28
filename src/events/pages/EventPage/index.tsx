import { EventTable } from '../../components/EventTable';

export function EventPage() {
  return (
    <div className='flex flex-col gap-4'>
      <h2 className='text-3xl font-bold tracking-tight'>Eventos</h2>
      <div className='rounded-md border'>
        <EventTable />
      </div>
    </div>
  );
}
