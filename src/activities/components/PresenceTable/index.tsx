import { ChangeEvent, useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import * as XLSX from 'xlsx';

import axiosInstance from '../../../axiosInstance';
import { ISubscribeModel } from '../../domain/entities/subscribeEntity';

interface PresenceTableProps {
  data: ISubscribeModel[];
  atividadeId: string;
}

export function PresenceTable({ data, atividadeId }: PresenceTableProps) {
  const [atividade, setAtividade] = useState({
    name: 'Carregando...',
    responsaveis: 'Sem Informação na Base de Dados',
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axiosInstance.get(`/atividades/${atividadeId}`);

        setAtividade(prev => {
          return { ...prev, name: data.nome };
        });
      } catch (error) {
        toast.error('Erro ao pegar dados do servidor, tente novamente');
      }
    };

    fetchData();
  }, [atividadeId]);

  const marcarPresenca = async (
    event: ChangeEvent<HTMLInputElement>,
    user_id: string
  ) => {
    event.target.disabled = true;
    try {
      await axiosInstance.put(
        `/atividades/${atividadeId}/inscricoes/${user_id}/frequencia`
      );
      toast.success('Presença registrada!');
    } catch (error) {
      event.target.checked = !event.target.checked;
      console.error('Erro ao marcar presença:', error);
      toast.error('Não foi possível executar a ação');
    }
    event.target.disabled = false;
  };

  const sanitizeFilename = (filename: string) => {
    return filename.replace(/[<>:"/\\|?*]+/g, '-');
  };

  const convertToXLSX = () => {
    const excelData = data.map(item => ({
      Nome: item.name,
      Email: item.email,
      Presenca: item.presenca ? 'Presente' : 'Ausente',
    }));

    const workbook = XLSX.utils.book_new();
    const worksheet = XLSX.utils.json_to_sheet(excelData);
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Presenças');

    const excelBuffer = XLSX.write(workbook, {
      bookType: 'xlsx',
      type: 'array',
    });

    const blob = new Blob([excelBuffer], {
      type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=utf-8',
    });

    const link = document.createElement('a');
    link.href = window.URL.createObjectURL(blob);
    link.setAttribute(
      'download',
      sanitizeFilename(`Lista Presença - ${atividade.name}.xlsx`)
    );
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className='flex flex-col'>
      <div className='flex flex-col py-5'>
        <span>
          <strong className='text-yellow-500'>Atividade: </strong>
          {atividade.name}
        </span>
        <span>
          <strong className='text-yellow-500'>Responsáveis: </strong>
          {atividade.responsaveis}
        </span>
      </div>
      <div className='w-full overflow-x-auto rounded-lg'>
        <table className='w-full'>
          <thead className='bg-blue-950'>
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
                Presença
              </th>
            </tr>
          </thead>
          <tbody className='divide-y divide-gray-200 bg-white'>
            {data.map(item => (
              <tr key={item.id}>
                <td className='whitespace-nowrap px-6 py-4 text-center text-black'>
                  {item.name}
                </td>
                <td className='whitespace-nowrap px-6 py-4 text-center text-black'>
                  {item.email}
                </td>
                <td className='whitespace-nowrap px-6 py-4 text-center text-black'>
                  <input
                    type='checkbox'
                    className='h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500'
                    defaultChecked={item.presenca}
                    onChange={e => marcarPresenca(e, item.id)}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className='mb-3 mt-3 flex w-full flex-col items-end'>
        <button
          onClick={convertToXLSX}
          className='rounded-md bg-green-500 px-4 py-2 text-white'
        >
          Exportar XLSX
        </button>
      </div>
    </div>
  );
}
