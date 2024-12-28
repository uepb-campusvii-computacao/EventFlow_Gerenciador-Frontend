import { useState } from 'react';
import { formatData } from '../../../core/utils/formatData';
import { useEventsContext } from '../../hooks/useEventsContext';
import { IEventEntity } from '../../domain/entities/eventEntity';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/core/components/ui/table';
import { Checkbox } from '@/core/components/ui/checkbox';

export function EventTable() {
  const { events, currentEvent, setCurrentEvent } = useEventsContext();
  const [selectedEvent, setSelectedEvent] =
    useState<IEventEntity>(currentEvent);

  const handleSwitch = (event: IEventEntity) => {
    setSelectedEvent(event);
    setCurrentEvent(event);
  };

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className='text-md font-semibold text-violet-600'>
            Nome
          </TableHead>
          <TableHead className='text-md font-semibold text-violet-600'>
            Data
          </TableHead>
          <TableHead className='text-md font-semibold text-violet-600'>
            Selecionar
          </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {events.map(item => (
          <TableRow key={item.uuid_evento}>
            <TableCell>{item.nome}</TableCell>
            <TableCell>{formatData(new Date(item.date))}</TableCell>
            <TableCell>
              <Checkbox
                checked={selectedEvent.uuid_evento === item.uuid_evento}
                onChange={() => handleSwitch(item)}
              />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
