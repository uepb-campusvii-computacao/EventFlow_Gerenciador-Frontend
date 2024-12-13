import { DownloadSimple, MagnifyingGlass } from '@phosphor-icons/react';
import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import * as XLSX from 'xlsx';
import { paths } from '@/paths';
import Pagination from '@/components/ui/Pagination.jsx';

const CompradoresTable = ({ data, produto_id }) => {
  const [users, setUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 20;

  useEffect(() => {
    const mappedResponse = data.map(item => {
      return {
        uuid_user: item.uuid_user,
        nome: item.nome,
        email: item.email,
      };
    });
    setUsers(mappedResponse);
  }, [data]);

  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = users.slice(indexOfFirstUser, indexOfLastUser);

  function searchUser(nome_user) {
    const filteredUsers = data.filter(user =>
      user.nome.toLowerCase().includes(nome_user.toLowerCase())
    );
    setCurrentPage(1);
    setUsers(filteredUsers);
  }

  // Change page
  const paginateFront = () => {
    if (indexOfLastUser < users.length) {
      setCurrentPage(currentPage + 1);
    }
  };

  const paginateBack = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const paginateToggle = page_number => {
    setCurrentPage(page_number);
  };

  const convertToExcel = () => {
    const excelData = [
      ['ID', 'Nome', 'Email'], // Cabeçalho
      ...data.map(item => [
        item.uuid_user, // Verifique se esta chave está correta
        item.nome,
        item.email,
      ]),
    ];

    const workbook = XLSX.utils.book_new();
    const worksheet = XLSX.utils.aoa_to_sheet(excelData);
    worksheet['!cols'] = [{ wch: 40 }, { wch: 40 }, { wch: 40 }];

    XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet1');

    const excelBuffer = XLSX.write(workbook, {
      bookType: 'xlsx',
      type: 'array',
    });

    const blob = new Blob([excelBuffer], {
      type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=utf-8',
    });

    const link = document.createElement('a');
    link.href = window.URL.createObjectURL(blob);
    link.setAttribute('download', 'Compradores.xlsx');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className='flex flex-col'>
      <div className='relative my-4 flex w-full items-center gap-4'>
        <input
          onChange={e => searchUser(e.target.value)}
          className='w-full rounded-md bg-white px-3 py-2 pl-12 text-gray-600'
          placeholder='Pesquise pelo nome'
          type='text'
        />
        <MagnifyingGlass
          className='absolute left-3'
          color='#1d4ed8'
          size={24}
        />
        <button
          onClick={convertToExcel}
          title='Exportar XLSX'
          className='rounded-md bg-green-500 p-2 text-white'
        >
          <DownloadSimple size={28} />
        </button>
      </div>
      <div className='w-full overflow-x-auto rounded-lg'>
        <table className='w-full'>
          <thead className='bg-indigo-500'>
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
                Email
              </th>
              <th
                scope='col'
                className='px-6 py-3 text-center text-xs font-medium uppercase tracking-wider text-white'
              >
                Compras
              </th>
            </tr>
          </thead>
          <tbody className='divide-y divide-gray-200 bg-white'>
            {currentUsers.map(item => (
              <tr key={item.uuid_user}>
                <td className='whitespace-nowrap px-6 py-4 text-center text-black'>
                  {item.nome}
                </td>
                <td className='whitespace-nowrap px-6 py-4 text-center text-black'>
                  {item.email}
                </td>
                <td className='whitespace-nowrap px-6 py-4 text-center text-black'>
                  <a
                    href={`${paths.loja}/usuario/${item.uuid_user}/compras/${produto_id}`}
                    className='flex w-full items-center justify-center text-blue-500 hover:text-blue-700'
                  >
                    <MagnifyingGlass size={32} />
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {users.length > usersPerPage && (
        <div className='flex w-full items-center justify-center px-8 py-3'>
          <Pagination
            usersPerPage={usersPerPage}
            totalUsers={users.length}
            paginateFront={paginateFront}
            paginateBack={paginateBack}
            currentPage={currentPage}
            paginateToggle={paginateToggle}
          />
        </div>
      )}
    </div>
  );
};

// Defina PropTypes para garantir a consistência dos dados
CompradoresTable.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      uuid_user: PropTypes.string.isRequired,
      nome: PropTypes.string.isRequired,
      email: PropTypes.string.isRequired,
    })
  ).isRequired,
};

export default CompradoresTable;
