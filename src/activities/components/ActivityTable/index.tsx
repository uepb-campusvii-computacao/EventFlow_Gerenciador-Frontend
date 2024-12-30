import { IActivityEntity } from '../../domain/entities/activityEntity';

import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from '@/core/components/ui/table';
import { ActivityTableRows } from './activity-table-rows';

interface ActivityTableProps {
  data: IActivityEntity[];
}

export function ActivityTable({ data }: ActivityTableProps) {
  return (
    <div className='rounded-md border'>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className='text-md font-semibold text-violet-600'>
              Atividade
            </TableHead>
            <TableHead className='text-md font-semibold text-violet-600'>
              Tipo de atividade
            </TableHead>
            <TableHead className='text-md font-semibold text-violet-600'>
              Vagas
            </TableHead>
            <TableHead className='text-md w-[140px] font-semibold text-violet-600'>
              Lista de Presença
            </TableHead>
            <TableHead className='text-md w-[64px] font-semibold text-violet-600'>
              Editar
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map(item => (
            <ActivityTableRows key={item.activityId} item={item} />
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
