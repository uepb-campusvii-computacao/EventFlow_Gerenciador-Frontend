import { useEffect, useState } from 'react';
import * as XLSX from 'xlsx';

import {
  IActivityEntity,
  minicurso,
  oficina,
  palestra,
  TypeActivity,
  workshop,
} from '../../domain/entities/activityEntity';

interface ActivityTableProps {
  data: IActivityEntity;
}

export function ActivityTable({ data }: ActivityTableProps) {
  const [atividadesExibidas, setAtividadesExibidas] = useState<
    (minicurso | workshop | oficina | palestra)[]
  >([]);
  const [tipoAtividadeSelecionada, setTipoAtividadeSelecionada] =
    useState<TypeActivity | null>(null);
  const [tiposAtividades, setTiposAtividades] = useState<TypeActivity[]>([]);

  useEffect(() => {
    if (data) {
      const availableTypes: TypeActivity[] = [];

      if (data.minicurso?.length) availableTypes.push(TypeActivity.MINICURSO);
      if (data.workshop?.length) availableTypes.push(TypeActivity.WORKSHOP);
      if (data.oficina?.length) availableTypes.push(TypeActivity.OFICINA);
      if (data.palestra?.length) availableTypes.push(TypeActivity.PALESTRA);

      setTiposAtividades(availableTypes);

      if (availableTypes.length > 0) {
        filtrarAtividades(availableTypes[0]);
      }
    }
  }, [data]);

  function filtrarAtividades(tipoAtividade: TypeActivity) {
    let atividadesFiltradas: (minicurso | workshop | oficina | palestra)[] = [];

    switch (tipoAtividade) {
      case TypeActivity.MINICURSO:
        atividadesFiltradas = data.minicurso || [];
        break;
      case TypeActivity.WORKSHOP:
        atividadesFiltradas = data.workshop || [];
        break;
      case TypeActivity.OFICINA:
        atividadesFiltradas = data.oficina || [];
        break;
      case TypeActivity.PALESTRA:
        atividadesFiltradas = data.palestra || [];
        break;
    }

    setAtividadesExibidas(atividadesFiltradas);
    setTipoAtividadeSelecionada(tipoAtividade);
  }

  const convertToXLSX = () => {
    const excelData = atividadesExibidas.map(item => ({
      Atividade: item.nome,
      'Vagas Máximas': item.max_participants || 0,
      'Tipo de Atividade': tipoAtividadeSelecionada,
    }));

    const workbook = XLSX.utils.book_new();
    const worksheet = XLSX.utils.json_to_sheet(excelData);

    worksheet['!cols'] = [{ wch: 70 }, { wch: 15 }, { wch: 20 }];

    XLSX.utils.book_append_sheet(workbook, worksheet, 'Atividades');

    const excelBuffer = XLSX.write(workbook, {
      bookType: 'xlsx',
      type: 'array',
    });

    const blob = new Blob([excelBuffer], {
      type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=utf-8',
    });

    const link = document.createElement('a');
    link.href = window.URL.createObjectURL(blob);
    link.setAttribute('download', `${tipoAtividadeSelecionada}S.xlsx`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className='flex flex-col'>
      <div className='w-full overflow-x-auto rounded-lg'>
        <div className='mb-4 flex w-full flex-col items-center justify-center gap-4 sm:mb-8 sm:flex-row sm:gap-12'>
          {tiposAtividades.map(tipo => (
            <button
              key={tipo}
              onClick={() => filtrarAtividades(tipo)}
              className={`w-full hover:bg-blue-900 ${
                tipoAtividadeSelecionada === tipo
                  ? 'bg-blue-900'
                  : 'bg-indigo-500'
              } rounded-md px-4 py-3 text-center text-3xl font-bold shadow-md transition-colors`}
            >
              {tipo.charAt(0).toUpperCase() + tipo.slice(1).toLowerCase()}
            </button>
          ))}
        </div>
        <table className='w-full'>
          <thead className='bg-indigo-500'>
            <tr>
              <th
                scope='col'
                className='px-6 py-3 text-center text-xs font-medium uppercase tracking-wider text-white'
              >
                Atividade
              </th>
              <th
                scope='col'
                className='px-6 py-3 text-center text-xs font-medium uppercase tracking-wider text-white'
              >
                Vagas
              </th>
              <th
                scope='col'
                className='px-6 py-3 text-center text-xs font-medium uppercase tracking-wider text-white'
              >
                Lista de Presença
              </th>
              <th
                scope='col'
                className='px-6 py-3 text-center text-xs font-medium uppercase tracking-wider text-white'
              >
                Ações
              </th>
            </tr>
          </thead>
          <tbody className='divide-y divide-gray-200 bg-white'>
            {atividadesExibidas.map(item => (
              <tr key={item.uuid_atividade}>
                <td className='whitespace-nowrap px-6 py-4 text-center text-black'>
                  {item.nome}
                </td>
                <td className='whitespace-nowrap px-6 py-4 text-center text-black'>
                  {`0/${item.max_participants}`}{' '}
                </td>
                <td className='flex flex-col items-center justify-center whitespace-nowrap px-6 py-4 text-center text-black'>
                  <a
                    href={`/atividades/${item.uuid_atividade}`}
                    className='pt-2 text-blue-500 hover:text-blue-700'
                  >
                    🔍
                  </a>
                </td>
                <td className='whitespace-nowrap px-6 py-4 text-center text-black'>
                  <a
                    href={`/atividades/editar/${item.uuid_atividade}`}
                    className='text-blue-500 hover:text-blue-700'
                  >
                    ✏️
                  </a>
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
          disabled={!tipoAtividadeSelecionada}
        >
          Exportar XLSX
        </button>
      </div>
    </div>
  );
}
