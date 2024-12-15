import { useState } from 'react';
import { formatData } from '../../../core/utils/formatData';
import { useEventsContext } from '../../hooks/useEventsContext';
import { IEventEntity } from '../../domain/entities/eventEntity';

export function EventTable() {
  const { events, currentEvent, setCurrentEvent } = useEventsContext();
  const [selectedEvent, setSelectedEvent] =
    useState<IEventEntity>(currentEvent);

  const handleSwitch = (event: IEventEntity) => {
    setSelectedEvent(event);
    setCurrentEvent(event);
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
                  {formatData(new Date(item.date))}
                </td>
                <td className='whitespace-nowrap px-6 py-4 text-center text-black'>
                  <input
                    type='checkbox'
                    checked={selectedEvent.uuid_evento === item.uuid_evento}
                    onChange={() => handleSwitch(item)}
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
