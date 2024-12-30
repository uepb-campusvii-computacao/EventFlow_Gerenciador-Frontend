import { ChangeEvent } from 'react';
import { toast } from 'react-toastify';

import { ISubscribeModel } from '../../domain/entities/subscribeEntity';
import { api } from '@/core/lib/axios';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/core/components/ui/table';
import { Checkbox } from '@/core/components/ui/checkbox';

interface PresenceTableProps {
  data: ISubscribeModel[];
  atividadeId: string;
}

export function PresenceTable({ data, atividadeId }: PresenceTableProps) {
  const handleCheckPresence = async (user_id: string) => {
    try {
      await api.put(
        `/atividades/${atividadeId}/inscricoes/${user_id}/frequencia`
      );
      toast.success('Presença registrada!');
    } catch (error) {
      console.error('Erro ao marcar presença:', error);
      toast.error('Não foi possível executar a ação');
    }
  };

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className='text-md font-semibold text-violet-600'>
            Nome
          </TableHead>
          <TableHead className='text-md font-semibold text-violet-600'>
            Email
          </TableHead>
          <TableHead className='text-md font-semibold text-violet-600'>
            Presença
          </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {data.map(item => (
          <TableRow key={item.id}>
            <TableCell>{item.name}</TableCell>
            <TableCell>{item.email}</TableCell>
            <TableCell>
              <Checkbox
                defaultChecked={item.presenca}
                onChange={() => handleCheckPresence(item.id)}
              />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}

// const sanitizeFilename = (filename: string) => {
//   return filename.replace(/[<>:"/\\|?*]+/g, '-');
// };

// const convertToXLSX = () => {
//   const excelData = data.map(item => ({
//     Nome: item.name,
//     Email: item.email,
//     Presenca: item.presenca ? 'Presente' : 'Ausente',
//   }));

//   const workbook = XLSX.utils.book_new();
//   const worksheet = XLSX.utils.json_to_sheet(excelData);
//   XLSX.utils.book_append_sheet(workbook, worksheet, 'Presenças');

//   const excelBuffer = XLSX.write(workbook, {
//     bookType: 'xlsx',
//     type: 'array',
//   });

//   const blob = new Blob([excelBuffer], {
//     type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=utf-8',
//   });

//   const link = document.createElement('a');
//   link.href = window.URL.createObjectURL(blob);
//   link.setAttribute('download', sanitizeFilename(`Lista Presença - .xlsx`));
//   document.body.appendChild(link);
//   link.click();
//   document.body.removeChild(link);
// };
