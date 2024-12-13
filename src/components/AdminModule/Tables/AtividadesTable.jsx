import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { FaEdit, FaSearch } from 'react-icons/fa';
import * as XLSX from 'xlsx';
import { paths } from '../../../paths';

const AtividadesTable = ({ data }) => {
  const [atividadesExibidas, setAtividadesExibidas] = useState([]);
  const [tipoAtividadeSelecionada, setTipoAtividadeSelecionada] =
    useState(null);
  const [tiposAtividades, setTiposAtividades] = useState([]);

  useEffect(() => {
    if (data && typeof data === 'object') {
      const tiposComAtividades = Object.keys(data).filter(
        tipo => data[tipo].length > 0
      );
      setTiposAtividades(tiposComAtividades);

      if (tiposComAtividades.length > 0) {
        const atividadesFiltradas = Array.isArray(data[tiposComAtividades[0]])
          ? data[tiposComAtividades[0]]
          : [];
        setAtividadesExibidas(atividadesFiltradas);
        setTipoAtividadeSelecionada(tiposComAtividades[0]);
      }
    }
    console.log(data);
  }, [data]);

  function filtrarAtividades(tipoAtividade) {
    const atividadesFiltradas = Array.isArray(data[tipoAtividade])
      ? data[tipoAtividade]
      : [];
    setAtividadesExibidas(atividadesFiltradas);
    setTipoAtividadeSelecionada(tipoAtividade);
  }

  const convertToXLSX = () => {
    const excelData = atividadesExibidas.map(item => ({
      Atividade: item.name,
      Inscricoes: item.inscricoes || 0,
      Vagas: item.max_participants || 0,
    }));

    const workbook = XLSX.utils.book_new();
    const worksheet = XLSX.utils.json_to_sheet(excelData);

    worksheet['!cols'] = [{ wch: 70 }, { wch: 10 }, { wch: 10 }];

    XLSX.utils.book_append_sheet(workbook, worksheet, 'Inscrições');

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
              {tipo.charAt(0).toUpperCase() + tipo.slice(1)}
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
              <tr key={item.id}>
                <td className='whitespace-nowrap px-6 py-4 text-center text-black'>
                  {item.name}
                </td>
                <td className='whitespace-nowrap px-6 py-4 text-center text-black'>
                  {`${item.inscricoes}/${item.max_participants}`}
                </td>
                <td className='flex flex-col items-center justify-center whitespace-nowrap px-6 py-4 text-center text-black'>
                  <a
                    href={`${paths.atividades}/${item.id}`}
                    className='pt-2 text-blue-500 hover:text-blue-700'
                  >
                    <FaSearch className='w-12' />
                  </a>
                </td>
                <td className='whitespace-nowrap px-6 py-4 text-center text-black'>
                  <a
                    href={`${paths.atividades}/editar/${item.id}`}
                    className='text-blue-500 hover:text-blue-700'
                  >
                    <FaEdit className='w-12' />
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
        >
          Exportar XLSX
        </button>
      </div>
    </div>
  );
};

AtividadesTable.propTypes = {
  data: PropTypes.objectOf(
    PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        inscricoes: PropTypes.number.isRequired,
        max_participants: PropTypes.number.isRequired,
        tipo_atividade: PropTypes.string.isRequired, // Novo campo adicionado para tipo de atividade
      })
    )
  ).isRequired,
};

export default AtividadesTable;
