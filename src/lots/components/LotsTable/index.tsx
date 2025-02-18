import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify';

import { ILotsEntity } from '../../domain/entities/lotsEntity';
import { formatPrice } from '../../../core/utils/formatPrice';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/core/components/ui/table';
import { Switch } from '@/core/components/ui/switch';
import { toggleLot } from '@/lots/data/services/toggleLot';

interface LotesTableProps {
  data: ILotsEntity[];
}

export function LotsTable({ data }: LotesTableProps) {
  const queryClient = useQueryClient();
  const { mutateAsync: updateActiveLot, isPending } = useMutation({
    mutationFn: toggleLot,
    mutationKey: ['toggle-lot'],
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['lots-data'] });
    },
  });

  async function handleToggleLot(lotId: string, checked: boolean) {
    const message = checked ? 'ativado' : 'inativado';

    try {
      await updateActiveLot(lotId);
      toast.success(`Lote ${message} com sucesso!`);
    } catch (error) {
      toast.error('Erro ao alterar lote!');
    }
  }

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className='text-md font-semibold text-violet-600'>
            Lotes
          </TableHead>
          <TableHead className='text-md font-semibold text-violet-600'>
            Descrição
          </TableHead>
          <TableHead className='text-md font-semibold text-violet-600'>
            Preço
          </TableHead>
          <TableHead className='text-md font-semibold text-violet-600'>
            Ativo
          </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {data.map(item => (
          <TableRow key={item.uuid_lote}>
            <TableCell>{item.nome}</TableCell>
            <TableCell>{item.descricao || 'Não disponível'}</TableCell>
            <TableCell>{formatPrice(item.preco)}</TableCell>
            <TableCell>
              <Switch
                disabled={isPending}
                checked={item.ativo}
                onCheckedChange={checked =>
                  handleToggleLot(item.uuid_lote, checked)
                }
              />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
