import { Switch } from '@/core/components/ui/switch';
import { TableCell, TableRow } from '@/core/components/ui/table';
import {
  ISubscribersEntity,
  StatusPagamento,
} from '@/events/domain/entities/subscribersEntity';

interface EventRegistrationTableRowProps {
  item: ISubscribersEntity;
  onToggleCredential: (id: string, checked: boolean) => void;
}

export function EventRegistrationTableRow({
  item,
  onToggleCredential,
}: EventRegistrationTableRowProps) {
  return (
    <TableRow>
      <TableCell className='hidden'>{item.uuid_user}</TableCell>
      <TableCell title={item.email}>{item.nome}</TableCell>
      <TableCell>{item.nome_cracha}</TableCell>
      <TableCell>{item.email}</TableCell>
      <TableCell>
        <div className='flex items-center gap-2'>
          {item.status_pagamento === StatusPagamento.REALIZED ? (
            <span className='w-[80px] rounded-full bg-green-300 p-0.5 text-center text-xs font-medium dark:text-muted'>
              Realizado
            </span>
          ) : item.status_pagamento === StatusPagamento.PENDING ? (
            <span className='w-[80px] rounded-full bg-rose-300 p-0.5 text-center text-xs font-medium dark:text-muted'>
              Pendente
            </span>
          ) : (
            <span className='w-[80px] rounded-full bg-blue-300 p-0.5 text-center text-xs font-medium dark:text-muted'>
              Gratuito
            </span>
          )}
        </div>
      </TableCell>
      <TableCell>
        <Switch
          checked={item.credenciamento}
          onCheckedChange={checked =>
            onToggleCredential(item.uuid_user, checked)
          }
        />
      </TableCell>
    </TableRow>
  );
}
