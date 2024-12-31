import { ISubscribersEntity } from '../../domain/entities/subscribersEntity';
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from '@/core/components/ui/table';
import { EventSubscribersTableRows } from './event-subscribers-table-rows';

interface EventSubscribersTableProps {
  data: ISubscribersEntity[];
}

export function EventSubscribersTable({ data }: EventSubscribersTableProps) {
  return (
    <div className='rounded-md border'>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className='text-md font-semibold text-violet-600'>
              Nome
            </TableHead>
            <TableHead className='text-md font-semibold text-violet-600'>
              Nome no crachá
            </TableHead>
            <TableHead className='text-md font-semibold text-violet-600'>
              E-mail
            </TableHead>
            <TableHead className='text-md w-[164px] font-semibold text-violet-600'>
              Status
            </TableHead>
            <TableHead className='text-md w-[64px] font-semibold text-violet-600'>
              Editar
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map(item => (
            <EventSubscribersTableRows key={item.uuid_user} item={item} />
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
