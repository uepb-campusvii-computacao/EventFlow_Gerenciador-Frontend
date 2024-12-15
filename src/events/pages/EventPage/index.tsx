import { Title } from '../../../core/components/Title';
import { EventTable } from '../../components/EventTable';

export function EventPage() {
  return (
    <div className='pb-8 md:px-8'>
      <Title title='Eventos' />
      <EventTable />
    </div>
  );
}
