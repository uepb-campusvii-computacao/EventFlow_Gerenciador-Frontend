import EventContext from '@/context/Event/EventContext';
import { useContext, useState } from 'react';

const formatarData = date => {
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = date.getFullYear();

  return `${day}/${month}/${year}`;
};

export default function EventosTable() {
  const { events, currentEvent, setCurrentEvent } = useContext(EventContext);
  const [selectedEvent, setSelectedEvent] = useState(currentEvent);

  const handleSwitch = value => {
    setSelectedEvent(value);
    setCurrentEvent(value);
  };

  return (
    <div className='flex flex-col'>
      <div className='w-full overflow-x-auto rounded-lg'>
        <table className='w-full'>
          <thead className='bg-blue-950'>
            <tr>
              <th
                scope='col'
                className='px-6 py-3 text-center text-xs font-medium uppercase tracking-wider text-white'
              >
                Nome
              </th>
              <th
                scope='col'
                className='px-6 py-3 text-center text-xs font-medium uppercase tracking-wider text-white'
              >
                Data
              </th>
              <th
                scope='col'
                className='px-6 py-3 text-center text-xs font-medium uppercase tracking-wider text-white'
              >
                Selecionar
              </th>
              <th
                scope='col'
                className='px-6 py-3 text-center text-xs font-medium uppercase tracking-wider text-white'
              ></th>
            </tr>
          </thead>
          <tbody className='divide-y divide-gray-200 bg-white'>
            {events.map(item => (
              <tr key={item.uuid_evento}>
                <td className='whitespace-nowrap px-6 py-4 text-center text-black'>
                  {item.nome}
                </td>
                <td className='whitespace-nowrap px-6 py-4 text-center text-black'>
                  {formatarData(new Date(item.date))}
                </td>
                <td className='whitespace-nowrap px-6 py-4 text-center text-black'>
                  <input
                    type='checkbox'
                    checked={selectedEvent === item.uuid_evento}
                    onChange={() => handleSwitch(item.uuid_evento)}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
