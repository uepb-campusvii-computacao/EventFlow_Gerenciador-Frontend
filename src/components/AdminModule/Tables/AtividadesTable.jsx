import PropTypes from "prop-types";
import { FaEdit, FaSearch } from "react-icons/fa";
import * as XLSX from "xlsx";
import paths from "../../../paths.js";
import { useEffect, useState } from "react";

const AtividadesTable = ({ data }) => {
  const [atividadesExibidas, setAtividadesExibidas] = useState(data);
  const [tipoAtividadeSelecionada, setTipoAtividadeSelecionada] =
    useState(null);

  function filtrarAtividades(tipoAtividade) {
    const atividadesFiltradas = data.filter(
      (atividade) => atividade.tipo_atividade === tipoAtividade
    );

    setAtividadesExibidas(atividadesFiltradas);
    setTipoAtividadeSelecionada(tipoAtividade);
  }

  useEffect(() => {
    filtrarAtividades("MINICURSO");
  }, []);

  const convertToXLSX = () => {
    const excelData = atividadesExibidas.map((item) => ({
      Atividade: item.name,
      Inscricoes: item.inscricoes || 0,
      Vagas: item.max_participants || 0,
    }));

    const workbook = XLSX.utils.book_new();
    const worksheet = XLSX.utils.json_to_sheet(excelData);

    worksheet['!cols'] = [
      { wch: 70 }, // Largura da coluna para 'Atividade'
      { wch: 10 }, // Largura da coluna para 'Inscricoes'
      { wch: 10 }, // Largura da coluna para 'Vagas'
    ];

    XLSX.utils.book_append_sheet(workbook, worksheet, "Inscrições");

    const excelBuffer = XLSX.write(workbook, {
      bookType: "xlsx",
      type: "array",
    });

    const blob = new Blob([excelBuffer], {
      type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=utf-8",
    });

    const link = document.createElement("a");
    link.href = window.URL.createObjectURL(blob);
    link.setAttribute("download", `${tipoAtividadeSelecionada}S.xlsx`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="flex flex-col">
      <div className="w-full overflow-x-auto rounded-lg">
        <div className="w-full flex flex-col items-center justify-center sm:gap-12 gap-4 sm:flex-row sm:mb-8 mb-4">
          <button
            onClick={() => filtrarAtividades("MINICURSO")}
            className={`hover:bg-blue-900 w-full ${
              tipoAtividadeSelecionada === "MINICURSO"
                ? "bg-blue-900"
                : "bg-indigo-500"
            } transition-colors font-bold text-3xl px-4 py-3 text-center rounded-md shadow-md`}
          >
            Minicursos
          </button>
          <button
            onClick={() => filtrarAtividades("OFICINA")}
            className={`hover:bg-blue-900 w-full ${
              tipoAtividadeSelecionada === "OFICINA"
                ? "bg-blue-900"
                : "bg-indigo-500"
            } transition-colors font-bold text-3xl px-4 py-3 text-center rounded-md shadow-md`}
          >
            Oficinas
          </button>
          <button
            onClick={() => filtrarAtividades("WORKSHOP")}
            className={`hover:bg-blue-900 w-full ${
              tipoAtividadeSelecionada === "WORKSHOP"
                ? "bg-blue-900"
                : "bg-indigo-500"
            } transition-colors font-bold text-3xl px-4 py-3 text-center rounded-md shadow-md`}
          >
            Workshops
          </button>
        </div>
        <table className="w-full">
          <thead className="bg-indigo-500">
            <tr>
              <th
                scope="col"
                className="px-6 py-3 text-center text-xs font-medium text-white uppercase tracking-wider"
              >
                Atividade
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-center text-xs font-medium text-white uppercase tracking-wider"
              >
                Vagas
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-center text-xs font-medium text-white uppercase tracking-wider"
              >
                Lista de Presença
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-center text-xs font-medium text-white uppercase tracking-wider"
              >
                Ações
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {atividadesExibidas.map((item) => (
              <tr key={item.id}>
                <td className="px-6 py-4 whitespace-nowrap text-black text-center">
                  {item.name}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-black text-center">
                  {`${item.inscricoes}/${item.max_participants}`}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-black text-center flex flex-col justify-center items-center">
                  <a
                    href={`${paths.atividades}/${item.id}`}
                    className="text-blue-500 hover:text-blue-700 pt-2"
                  >
                    <FaSearch className="w-12" />
                  </a>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-black text-center">
                  <a
                    href={`${paths.atividades}/editar/${item.id}`}
                    className="text-blue-500 hover:text-blue-700"
                  >
                    <FaEdit className="w-12" />
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="flex flex-col items-end w-full mt-3 mb-3">
        <button
          onClick={convertToXLSX}
          className="bg-green-500 text-white px-4 py-2 rounded-md"
        >
          Exportar XLSX
        </button>
      </div>
    </div>
  );
};

AtividadesTable.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      inscricoes: PropTypes.number.isRequired,
    })
  ).isRequired,
};

export default AtividadesTable;
