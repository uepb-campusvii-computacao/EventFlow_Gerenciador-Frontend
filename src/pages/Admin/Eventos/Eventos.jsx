import EventosTable from '@/components/AdminModule/Tables/EventosTable';
import Title from '@/components/ui/Title';

export default function Eventos() {
  return (
    <div className='pb-8 md:px-8'>
      <Title title='Eventos' />
      <EventosTable />
    </div>
  );
}
