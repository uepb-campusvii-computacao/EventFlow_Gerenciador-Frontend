import { CaretLeft, CaretRight } from "@phosphor-icons/react";

export default function Pagination({
  usersPerPage,
  totalUsers,
  paginateFront,
  paginateBack,
  currentPage,
  paginateToggle,
}) {
  const total_pages = Math.ceil(totalUsers / usersPerPage);
  const maxVisiblePages = 5; // Número máximo de botões de página visíveis

  let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
  let endPage = Math.min(startPage + maxVisiblePages - 1, total_pages);

  if (endPage - startPage + 1 < maxVisiblePages) {
    startPage = Math.max(1, endPage - maxVisiblePages + 1);
  }

  const pages = Array.from({ length: endPage - startPage + 1 }, (_, index) => startPage + index);

  return (
    <div className="flex flex-col items-center justify-center py-3">
      <nav className="block"></nav>
      <div className="flex items-center justify-center">
        <button
          onClick={paginateBack}
          className="relative inline-flex items-center p-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 mr-1"
        >
          <CaretLeft size={20} />
        </button>
        <div className="flex items-center gap-1">
          {pages.map((page) => (
            <button
              className={`relative inline-flex items-center px-3 py-2 rounded border ${
                page === currentPage
                  ? "border-blue-600 bg-blue-600 text-white"
                  : "border-gray-300 bg-white"
              } leading-tight text-sm font-medium text-gray-500 hover:opacity-70`}
              onClick={() => paginateToggle(page)}
              key={page}
            >
              {page}
            </button>
          ))}
          
        </div>
        <button
          onClick={paginateFront}
          className="relative inline-flex items-center p-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 ml-1"
        >
          <CaretRight size={20} />
        </button>
      </div>
    </div>
  );
}
