import { Button } from '@/core/components/ui/button';
import { Dialog, DialogTrigger } from '@/core/components/ui/dialog';
import { TableCell, TableRow } from '@/core/components/ui/table';
import {
  ISubscribersEntity,
  StatusPagamento,
} from '@/events/domain/entities/subscribersEntity';
import { Edit } from 'lucide-react';
import { EditParticipantModal } from '../EditParticipantModal';

interface EventSubscribersTableRowsProps {
  item: ISubscribersEntity;
}

export function EventSubscribersTableRows({
  item,
}: EventSubscribersTableRowsProps) {
  return (
    <TableRow key={item.uuid_user}>
      <TableCell>{item.nome_cracha}</TableCell>

      <TableCell>{item.nome_cracha}</TableCell>

      <TableCell>{item.email}</TableCell>

      <TableCell>
        <div className='flex items-center gap-2'>
          {item.status_pagamento === 'REALIZADO' ? (
            <span className='w-[80px] rounded-full bg-green-300 p-0.5 text-center text-xs font-medium dark:text-muted'>
              Realizado
            </span>
          ) : item.status_pagamento === 'PENDENTE' ||
            item.status_pagamento === 'EXPIRADO' ? (
            <span className='w-[80px] rounded-full bg-rose-300 p-0.5 text-center text-xs font-medium dark:text-muted'>
              {item.status_pagamento === StatusPagamento.EXPIRED
                ? 'Expirado'
                : 'Pendente'}
            </span>
          ) : (
            <span className='w-[80px] rounded-full bg-blue-300 p-0.5 text-center text-xs font-medium dark:text-muted'>
              Gratuito
            </span>
          )}
        </div>
      </TableCell>

      <TableCell>
        <Dialog>
          <DialogTrigger asChild>
            <Button variant='outline'>
              <Edit className='h-4 w-4' />
            </Button>
          </DialogTrigger>

          <EditParticipantModal />
        </Dialog>
      </TableCell>
    </TableRow>
  );
}
