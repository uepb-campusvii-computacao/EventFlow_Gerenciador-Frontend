import { ChangeEvent, useState } from 'react';

import { toast } from 'react-toastify';
import * as XLSX from 'xlsx';
import { DownloadSimple, Funnel, MagnifyingGlass } from '@phosphor-icons/react';

import {
  ISubscribersEntity,
  StatusPagamento,
} from '../../domain/entities/subscribersEntity';
import { useEventsContext } from '../../hooks/useEventsContext';
import axiosInstance from '../../../axiosInstance';
import { loadToggleRegistrationEndpoint } from '../../utils/loadToggleRegistrationEndpoint';
import { Popover } from '../../../core/components/Popover';
import { Pagination } from '../../../core/components/Pagination';

interface IEventRegistrationTableProps {
  data: ISubscribersEntity[];
}

interface EventRegistrationTableState {
  users: ISubscribersEntity[];
  currentPage: number;
  usersPerPage: number;
  filterOpen: boolean;
  filter: string;
}

export function EventRegistrationTable({ data }: IEventRegistrationTableProps) {
  const { currentEvent } = useEventsContext();

  const [state, setState] = useState<EventRegistrationTableState>({
    users: data,
    currentPage: 1,
    usersPerPage: 20,
    filter: '',
    filterOpen: false,
  });

  const indexOfLastUser = state.currentPage * state.usersPerPage;
  const indexOfFirstUser = indexOfLastUser - state.usersPerPage;
  const currentUsers = state.users.slice(indexOfFirstUser, indexOfLastUser);

  function searchUser(nome_user: string) {
    const filteredUsers = data.filter(user =>
      user.nome.toLowerCase().includes(nome_user.toLowerCase())
    );
    setState(prevState => ({ ...prevState, users: filteredUsers }));
  }

  const paginateFront = () => {
    if (indexOfLastUser < state.users.length) {
      setState(prevState => ({
        ...prevState,
        currentPage: prevState.currentPage + 1,
      }));
    }
  };

  const paginateBack = () => {
    if (state.currentPage > 1) {
      setState(prevState => ({
        ...prevState,
        currentPage: prevState.currentPage - 1,
      }));
    }
  };

  const paginateToggle = (page_number: number) => {
    setState(prevState => ({
      ...prevState,
      currentPage: page_number,
    }));
  };

  const convertToExcel = () => {
    const excelData = data.map(item => ({
      ID: item.uuid_user,
      Nome: item.nome,
      'Nome no crachá': item.nome_cracha,
      Email: item.email,
      Pagamento: item.status_pagamento,
      Credenciamento: item.credenciamento ? 'Sim' : 'Não',
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

  function toggleFilter(value: string) {
    if (state.filter === value) {
      setState(prevState => ({ ...prevState, filter: '', users: data }));
    } else {
      setState(prevState => ({
        ...prevState,
        filter: value,
        users: data.filter(item => item.status_pagamento === value),
      }));
    }
  }

  const toggleCredential = async (
    event: ChangeEvent<HTMLInputElement>,
    user_id: string
  ) => {
    try {
      await axiosInstance.put(
        loadToggleRegistrationEndpoint(currentEvent.uuid_evento, user_id)
      );
      event.target.checked = !event.target.checked;
      toast.success('Credenciamento Marcado');
    } catch (error) {
      console.error('Erro ao marcar credenciamento:', error);
      toast.error('Erro ao marcar credenciamento');
    }
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
          open={state.filterOpen}
          togglePopover={() =>
            setState(prevState => ({
              ...prevState,
              filterOpen: !state.filterOpen,
            }))
          }
          icon={<Funnel size={28} />}
        >
          <div className='flex flex-col gap-2 text-black'>
            <label
              htmlFor='realizado'
              className={`rounded-md bg-gray-200 px-3 py-2 text-sm transition-colors hover:bg-gray-400 ${
                state.filter === 'REALIZADO' && 'bg-gray-400'
              }`}
            >
              <input
                onChange={e => toggleFilter(e.target.value)}
                value='REALIZADO'
                checked={state.filter === 'REALIZADO'}
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
                state.filter === 'GRATUITO' && 'bg-gray-400'
              }`}
            >
              <input
                onChange={e => toggleFilter(e.target.value)}
                value='GRATUITO'
                checked={state.filter === 'gratuito'}
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
              <tr key={item.uuid_user}>
                <td className='hidden'>{item.uuid_user}</td>
                <td
                  title={item.email}
                  className={`whitespace-nowrap px-6 py-4 text-center text-black`}
                >
                  {item.nome}
                </td>
                <td className='whitespace-nowrap px-6 py-4 text-center text-black'>
                  {item.nome_cracha}
                </td>
                <td className='whitespace-nowrap px-6 py-4 text-center text-black'>
                  {item.email}
                </td>
                <td className='flex justify-center whitespace-nowrap px-6 py-4 text-center text-black'>
                  {item.status_pagamento === StatusPagamento.REALIZED ? (
                    <span className='me-2 rounded bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-800 dark:bg-green-900 dark:text-green-300'>
                      {item.status_pagamento}
                    </span>
                  ) : item.status_pagamento === StatusPagamento.PENDING ? (
                    <span className='me-2 rounded bg-red-100 px-2.5 py-0.5 text-xs font-medium text-red-800 dark:bg-red-900 dark:text-red-300'>
                      {item.status_pagamento}
                    </span>
                  ) : (
                    <span className='me-2 rounded bg-gray-400 px-2.5 py-0.5 text-xs font-medium text-white dark:bg-gray-400 dark:text-white'>
                      {item.status_pagamento}
                    </span>
                  )}
                </td>
                <td className='whitespace-nowrap px-6 py-4 text-center text-black'>
                  <input
                    type='checkbox'
                    className='h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500'
                    defaultChecked={item.credenciamento}
                    onChange={event => toggleCredential(event, item.uuid_user)}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {state.users.length > state.usersPerPage && (
        <div className='flex w-full items-center justify-center px-8 py-3'>
          <Pagination
            usersPerPage={state.usersPerPage}
            totalUsers={state.users.length}
            paginateFront={paginateFront}
            paginateBack={paginateBack}
            currentPage={state.currentPage}
            paginateToggle={paginateToggle}
          />
        </div>
      )}
    </div>
  );
}
