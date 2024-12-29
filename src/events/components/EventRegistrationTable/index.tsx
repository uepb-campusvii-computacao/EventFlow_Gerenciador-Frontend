import { useState } from 'react';

import { toast } from 'react-toastify';
import * as XLSX from 'xlsx';

import { ISubscribersEntity } from '../../domain/entities/subscribersEntity';
import { useEventsContext } from '../../hooks/useEventsContext';
import { loadToggleRegistrationEndpoint } from '../../utils/loadToggleRegistrationEndpoint';
import { Pagination } from '../../../core/components/Pagination';
import { api } from '@/core/lib/axios';
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from '@/core/components/ui/table';
import { EventRegistrationTableRow } from './event-registration-table-row';

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

  const handleToggleCredential = async (user_id: string, checked: boolean) => {
    try {
      if (checked) {
        await api.put(
          loadToggleRegistrationEndpoint(currentEvent.uuid_evento, user_id)
        );
        toast.success('Credenciamento Marcado');
      } else {
        await api.put(
          loadToggleRegistrationEndpoint(currentEvent.uuid_evento, user_id)
        );
        toast.success('Credenciamento Desmarcado');
      }
    } catch (error) {
      console.error('Erro ao alterar credenciamento:', error);
      toast.error('Erro ao alterar credenciamento');
    }
  };

  return (
    <div>
      <div className='rounded-md border'>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className='hidden'>Identificador</TableHead>
              <TableHead className='text-md font-semibold text-violet-600'>
                Nome
              </TableHead>
              <TableHead className='text-md font-semibold text-violet-600'>
                Nome no crachá
              </TableHead>
              <TableHead className='text-md font-semibold text-violet-600'>
                E-mail
              </TableHead>
              <TableHead className='text-md w-[164px] font-semibold text-violet-600'>
                Status
              </TableHead>
              <TableHead className='text-md w-[64px] font-semibold text-violet-600'>
                Credenciado
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {currentUsers.map(item => (
              <EventRegistrationTableRow
                key={`${item.uuid_user}-${item.email}`}
                item={item}
                onToggleCredential={handleToggleCredential}
              />
            ))}
          </TableBody>
        </Table>
      </div>
      {state.users.length > state.usersPerPage && (
        <div className='m-2'>
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

/* <div className='relative my-4 flex w-full items-center gap-4'>
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
      </div> */
