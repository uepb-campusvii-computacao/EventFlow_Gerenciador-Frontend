import { CaretLeft, CaretRight } from '@phosphor-icons/react';

interface PaginationProps {
  usersPerPage: number;
  totalUsers: number;
  currentPage: number;

  paginateFront: () => void;
  paginateBack: () => void;
  paginateToggle: (page: number) => void;
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
    <div className='flex flex-col items-center justify-center py-3'>
      <nav className='block'></nav>
      <div className='flex items-center justify-center'>
        <button
          onClick={paginateBack}
          className='relative mr-1 inline-flex items-center rounded-l-md border border-gray-300 bg-white p-2 text-sm font-medium text-gray-500 hover:bg-gray-50'
        >
          <CaretLeft size={20} />
        </button>
        <div className='flex items-center gap-1'>
          {pages.map(page => (
            <button
              className={`relative inline-flex items-center rounded border px-3 py-2 ${
                page === currentPage
                  ? 'border-blue-600 bg-blue-600 text-white'
                  : 'border-gray-300 bg-white'
              } text-sm font-medium leading-tight text-gray-500 hover:opacity-70`}
              onClick={() => paginateToggle(page)}
              key={page}
            >
              {page}
            </button>
          ))}
        </div>
        <button
          onClick={paginateFront}
          className='relative ml-1 inline-flex items-center rounded-r-md border border-gray-300 bg-white p-2 text-sm font-medium text-gray-500 hover:bg-gray-50'
        >
          <CaretRight size={20} />
        </button>
      </div>
    </div>
  );
}
