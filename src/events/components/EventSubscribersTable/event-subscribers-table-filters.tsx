import { Download, Search, X } from 'lucide-react';

import { Button } from '@/core/components/ui/button';
import { Input } from '@/core/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/core/components/ui/select';
import { StatusPagamento } from '@/events/domain/entities/subscribersEntity';

export function EventSubscribersTableFilters() {
  return (
    <form className='flex items-center gap-2'>
      <span className='text-sm font-semibold'>Filtros:</span>

      <Input placeholder='Pesquise pelo nome' className='h-8 w-[350px]' />

      <Select defaultValue='all'>
        <SelectTrigger className='h-8 w-[180px]'>
          <SelectValue></SelectValue>
        </SelectTrigger>
        <SelectContent>
          <SelectItem value='all'>Todos Status</SelectItem>
          <SelectItem value={StatusPagamento.REALIZED}>Realizado</SelectItem>
          <SelectItem value={StatusPagamento.EXPIRED}>Expirado</SelectItem>
          <SelectItem value={StatusPagamento.FREE}>Gratuito</SelectItem>
          <SelectItem value={StatusPagamento.PENDING}>Pendente</SelectItem>
        </SelectContent>
      </Select>

      <Button type='submit' variant='secondary' size='sm'>
        <Search className='mr-2 h-4 w-4' />
        Filtrar resultados
      </Button>

      <Button type='button' size='sm'>
        <Download className='mr-2 h-4 w-4' />
        Baixar planilha
      </Button>

      <Button type='button' variant='outline' size='sm'>
        <X className='mr-2 h-4 w-4' />
        Remover filtros
      </Button>
    </form>
  );
}

// const convertToExcel = () => {
//   const excelData = data.map(item => ({
//     ID: item.uuid_user,
//     Nome: item.nome,
//     'Nome no crachá': item.nome_cracha,
//     Email: item.email,
//     Pagamento: item.status_pagamento,
//     Credenciamento: item.credenciamento ? 'Sim' : 'Não',
//   }));

//   const workbook = XLSX.utils.book_new();
//   const worksheet = XLSX.utils.json_to_sheet(excelData);

//   worksheet['!cols'] = [
//     { wch: 40 },
//     { wch: 40 },
//     { wch: 30 },
//     { wch: 40 },
//     { wch: 20 },
//     { wch: 20 },
//   ];

//   XLSX.utils.book_append_sheet(workbook, worksheet, 'Dados');

//   const excelBuffer = XLSX.write(workbook, {
//     bookType: 'xlsx',
//     type: 'array',
//   });

//   const blob = new Blob([excelBuffer], {
//     type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=utf-8',
//   });

//   const link = document.createElement('a');
//   link.href = window.URL.createObjectURL(blob);
//   link.setAttribute('download', 'Credenciamento.xlsx');
//   document.body.appendChild(link);
//   link.click();
//   document.body.removeChild(link);
// };
