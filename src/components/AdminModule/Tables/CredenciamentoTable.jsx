import axiosInstance from '@/axiosInstance';
import { BACKEND_DEFAULT_URL } from '@/backendPaths';
import Pagination from '@/components/ui/Pagination.jsx';
import EventContext from '@/context/Event/EventContext.jsx';
import { DownloadSimple, Funnel, MagnifyingGlass } from '@phosphor-icons/react';
import PropTypes from 'prop-types';
import { useContext, useState } from 'react';
import { toast } from 'react-toastify';
import * as XLSX from 'xlsx';
import Popover from '../../ui/Popover';

const toggleCredenciamentoEndpoint = (id_evento, user_id) => {
  return `${BACKEND_DEFAULT_URL}/events/${id_evento}/inscricoes/credenciamento/${user_id}`;
};

const CredenciamentoTable = ({ data }) => {
  const { currentEvent } = useContext(EventContext);

  const [users, setUsers] = useState(data);
  const [currentPage, setCurrentPage] = useState(1);

  const [usersPerPage] = useState(20);

  const [filterOpen, setFilterOpen] = useState(false);

  const [filter, setFilter] = useState('');

  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = users.slice(indexOfFirstUser, indexOfLastUser);

  function searchUser(nome_user) {
    const filteredUsers = data.filter(user =>
      user.name.toLowerCase().includes(nome_user.toLowerCase())
    );
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
    const excelData = data.map(item => ({
      ID: item.id,
      Nome: item.name,
      'Nome no crachá': item.nome_cracha,
      Email: item.email,
      Pagamento: item.paymentStatus,
      Credenciamento: item.credential ? 'Sim' : 'Não',
    }));

    const workbook = XLSX.utils.book_new();
    const worksheet = XLSX.utils.json_to_sheet(excelData);

    worksheet['!cols'] = [
      { wch: 40 },
      { wch: 40 },
      { wch: 30 },
      { wch: 40 },
      { wch: 20 },
      { wch: 20 },
    ];

    XLSX.utils.book_append_sheet(workbook, worksheet, 'Dados');

    const excelBuffer = XLSX.write(workbook, {
      bookType: 'xlsx',
      type: 'array',
    });

    const blob = new Blob([excelBuffer], {
      type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=utf-8',
    });

    const link = document.createElement('a');
    link.href = window.URL.createObjectURL(blob);
    link.setAttribute('download', 'Credenciamento.xlsx');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  function toggleFilter(value) {
    if (filter === value) {
      setFilter('');
      setUsers(data);
    } else {
      setFilter(value);
      setUsers(data.filter(item => item.paymentStatus === value));
    }
  }

  const toggleCredential = async (user_id, { target }) => {
    target.disabled = true;
    try {
      await axiosInstance.put(
        toggleCredenciamentoEndpoint(currentEvent, user_id)
      );
      toast.success('Credenciamento Marcado');
    } catch (error) {
      target.checked = !target.checked;
      console.error('Erro ao marcar credenciamento:', error);
      toast.error('Erro ao marcar credenciamento');
    }
    target.disabled = false;
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
        <Popover
          open={filterOpen}
          togglePopover={() => setFilterOpen(!filterOpen)}
          icon={<Funnel size={28} />}
        >
          <div className='flex flex-col gap-2 text-black'>
            <label
              htmlFor='realizado'
              className={`rounded-md bg-gray-200 px-3 py-2 text-sm transition-colors hover:bg-gray-400 ${
                filter === 'REALIZADO' && 'bg-gray-400'
              }`}
            >
              <input
                onChange={e => toggleFilter(e.target.value)}
                value='REALIZADO'
                checked={filter === 'REALIZADO'}
                className='hidden'
                type='checkbox'
                name=''
                id='realizado'
              />
              <span>REALIZADO</span>
            </label>
            <label
              htmlFor='gratuito'
              className={`rounded-md bg-gray-200 px-3 py-2 text-sm transition-colors hover:bg-gray-400 ${
                filter === 'GRATUITO' && 'bg-gray-400'
              }`}
            >
              <input
                onChange={e => toggleFilter(e.target.value)}
                value='GRATUITO'
                checked={filter === 'gratuito'}
                className='hidden'
                type='checkbox'
                name=''
                id='gratuito'
              />
              <span>GRATUITO</span>
            </label>
          </div>
        </Popover>
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
              <th scope='col' className='hidden'>
                ID
              </th>
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
                Nome no crachá
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
                Status
              </th>
              <th
                scope='col'
                className='px-6 py-3 text-center text-xs font-medium uppercase tracking-wider text-white'
              >
                Credenciamento
              </th>
            </tr>
          </thead>
          <tbody className='divide-y divide-gray-200 bg-white'>
            {currentUsers.map(item => (
              <tr key={item.id}>
                <td className='hidden'>{item.id}</td>
                <td
                  title={item.email}
                  className={`whitespace-nowrap px-6 py-4 text-center text-black`}
                >
                  {item.name}
                </td>
                <td className='whitespace-nowrap px-6 py-4 text-center text-black'>
                  {item.nome_cracha}
                </td>
                <td className='whitespace-nowrap px-6 py-4 text-center text-black'>
                  {item.email}
                </td>
                <td className='flex justify-center whitespace-nowrap px-6 py-4 text-center text-black'>
                  {item.paymentStatus === 'REALIZADO' ? (
                    <span className='me-2 rounded bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-800 dark:bg-green-900 dark:text-green-300'>
                      {item.paymentStatus}
                    </span>
                  ) : item.paymentStatus === 'PENDENTE' ? (
                    <span className='me-2 rounded bg-red-100 px-2.5 py-0.5 text-xs font-medium text-red-800 dark:bg-red-900 dark:text-red-300'>
                      {item.paymentStatus}
                    </span>
                  ) : (
                    <span className='me-2 rounded bg-gray-400 px-2.5 py-0.5 text-xs font-medium text-white dark:bg-gray-400 dark:text-white'>
                      {item.paymentStatus}
                    </span>
                  )}
                </td>
                <td className='whitespace-nowrap px-6 py-4 text-center text-black'>
                  <input
                    type='checkbox'
                    className='h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500'
                    defaultChecked={item.credential}
                    onClick={ref => toggleCredential(item.id, ref)}
                  />
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

CredenciamentoTable.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      email: PropTypes.string.isRequired,
      paymentStatus: PropTypes.string.isRequired,
      credential: PropTypes.bool.isRequired,
    })
  ).isRequired,
};

export default CredenciamentoTable;
