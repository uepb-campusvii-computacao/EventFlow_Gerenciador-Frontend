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
import { Download, Search, X } from 'lucide-react';

export function EventRegistrationTableFilters() {
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
