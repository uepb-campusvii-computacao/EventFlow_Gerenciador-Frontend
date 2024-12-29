import { Button } from '../ui/button';
import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
} from 'lucide-react';

interface PaginationProps {
  usersPerPage: number;
  totalUsers: number;
  currentPage: number;

  paginateFront: () => void;
  paginateBack: () => void;
  paginateToggle?: (page: number) => void;
}

export function Pagination({
  usersPerPage,
  totalUsers,
  paginateFront,
  paginateBack,
  currentPage,
  paginateToggle,
}: PaginationProps) {
  const total_pages = Math.ceil(totalUsers / usersPerPage);
  const maxVisiblePages = 5; // Número máximo de botões de página visíveis

  let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
  let endPage = Math.min(startPage + maxVisiblePages - 1, total_pages);

  if (endPage - startPage + 1 < maxVisiblePages) {
    startPage = Math.max(1, endPage - maxVisiblePages + 1);
  }

  const pages = Array.from(
    { length: endPage - startPage + 1 },
    (_, index) => startPage + index
  );

  return (
    <div className='flex items-center justify-between'>
      <span className='text-sm text-muted-foreground'>
        Total de {totalUsers} item(s)
      </span>

      <div className='flex items-center gap-6 lg:gap-8'>
        <div className='flex text-sm font-medium'>
          Página {currentPage} de {total_pages}
        </div>

        <div className='flex items-center gap-2'>
          <Button
            type='button'
            onClick={paginateBack}
            variant='outline'
            className='h-8 w-8 p-0'
          >
            <ChevronsLeft className='h-4 w-4' />
            <span className='sr-only'>Primeira página</span>
          </Button>

          <Button
            type='button'
            onClick={paginateBack}
            variant='outline'
            className='h-8 w-8 p-0'
          >
            <ChevronLeft className='h-4 w-4' />
            <span className='sr-only'>Página anterior</span>
          </Button>

          <Button
            type='button'
            onClick={paginateFront}
            variant='outline'
            className='h-8 w-8 p-0'
          >
            <ChevronRight className='h-4 w-4' />
            <span className='sr-only'>Próxima página</span>
          </Button>

          <Button
            type='button'
            onClick={paginateFront}
            variant='outline'
            className='h-8 w-8 p-0'
          >
            <ChevronsRight className='h-4 w-4' />
            <span className='sr-only'>Última página</span>
          </Button>
        </div>
      </div>
    </div>
  );
}
