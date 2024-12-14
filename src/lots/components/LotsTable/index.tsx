import { useState } from 'react';
import axiosInstance from '../../../axiosInstance';
import { ILotsTableDataEntity } from '../../domain/entities/lotsEntity';
import { formatPrice } from '../../utils/formatPrice';

interface LotesTableProps {
  data: ILotsTableDataEntity[];
}

export function LotsTable({ data }: LotesTableProps) {
  const [lotes, setLotes] = useState<ILotsTableDataEntity[]>(data);
  const [loading, setLoading] = useState<boolean>(false);

  const handleSwitch = async (lote_id: string, ativo: boolean) => {
    setLoading(true);

    try {
      await axiosInstance.put(`/lote/${lote_id}/change_inscricoes_visibility`);

      setLotes(prevLotes =>
        prevLotes.map(lote =>
          lote.id === lote_id ? { ...lote, ativo: !ativo } : lote
        )
      );
    } catch (error) {
      console.error('Erro ao alternar o estado ativo do lote:', error);
    } finally {
      setLoading(false);
    }
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
                Descrição
              </th>
              <th
                scope='col'
                className='px-6 py-3 text-center text-xs font-medium uppercase tracking-wider text-white'
              >
                Preço
              </th>
              <th
                scope='col'
                className='px-6 py-3 text-center text-xs font-medium uppercase tracking-wider text-white'
              >
                Ativo
              </th>
            </tr>
          </thead>
          <tbody className='divide-y divide-gray-200 bg-white'>
            {lotes.map(item => (
              <tr key={item.id}>
                <td className='whitespace-nowrap px-6 py-4 text-center text-black'>
                  {item.nome}
                </td>
                <td className='whitespace-nowrap px-6 py-4 text-center text-black'>
                  {item.descricao || 'Não disponível'}
                </td>
                <td className='whitespace-nowrap px-6 py-4 text-center text-black'>
                  {formatPrice(item.preco)}
                </td>
                <td className='whitespace-nowrap px-6 py-4 text-center text-black'>
                  <input
                    type='checkbox'
                    checked={item.ativo}
                    onChange={() => handleSwitch(item.id, item.ativo)}
                    disabled={loading}
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
