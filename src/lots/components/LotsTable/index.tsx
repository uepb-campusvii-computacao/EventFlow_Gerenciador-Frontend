import { useState } from 'react';
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

import { api } from '@/core/lib/axios';
import { toast } from 'react-toastify';

interface LotesTableProps {
  data: ILotsEntity[];
}

export function LotsTable({ data }: LotesTableProps) {
  const [lotes, setLotes] = useState<ILotsEntity[]>(data);
  const [loading, setLoading] = useState<boolean>(false);

  const handleToggleActive = async (lotId: string) => {
    setLoading(true);

    try {
      setLotes(prevLotes =>
        prevLotes.map(lote =>
          lote.uuid_lote === lotId ? { ...lote, ativo: !lote.ativo } : lote
        )
      );

      await api.put(`/lote/${lotId}/change_inscricoes_visibility`);
      toast.success('Lote alterado com sucesso.');
    } catch (error) {
      console.error('Erro ao alternar o estado ativo do lote:', error);
    } finally {
      setLoading(false);
    }
  };

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
        {lotes.map(item => (
          <TableRow key={item.uuid_lote}>
            <TableCell>{item.nome}</TableCell>
            <TableCell>{item.descricao || 'Não disponível'}</TableCell>
            <TableCell>{formatPrice(item.preco)}</TableCell>
            <TableCell>
              <Switch
                disabled={loading}
                checked={item.ativo}
                onCheckedChange={() => handleToggleActive(item.uuid_lote)}
              />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
