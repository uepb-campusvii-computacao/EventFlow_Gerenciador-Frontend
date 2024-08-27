import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import * as XLSX from 'xlsx';
import axiosInstance from "../../../axiosInstance";

const PresencaTable = ({ data, atividadeId }) => {
  const [atividade, setAtividade] = useState({name: "Carregando...", responsaveis: "Sem Informação na Base de Dados"})

  useEffect(() => {
    const fetchData = async () =>{
      try{
        const {data} = await axiosInstance.get(`/admin/atividades/${atividadeId}`)
        
        setAtividade(prev => { 
          return {...prev, name: data.nome}
        })
      }catch(error){
        toast.error("Erro ao pegar dados do servidor, tente novamente")
      }
    }

    fetchData();
  }, [atividadeId])

  const marcarPresenca = async (user_id, { target }) => {
    target.disabled = true
    try{
      await axiosInstance.put(`/admin/atividades/${atividadeId}/inscricoes/${user_id}/frequencia`)
      toast.success("Presença registrada!")
    }catch(error){
      target.checked = !target.checked
      console.error("Erro ao marcar presença:", error);
      toast.error("Não foi possível executar a ação")      
    }
    target.disabled = false
  }

  const sanitizeFilename = (filename) => {
    return filename.replace(/[<>:"/\\|?*]+/g, '-');
  };

  const convertToXLSX = () => {
    const excelData = data.map((item) => ({
      Nome: item.name,
      Email: item.email,
      Presenca: item.presenca ? "Presente" : "Ausente",
    }));
  
    const workbook = XLSX.utils.book_new();
    const worksheet = XLSX.utils.json_to_sheet(excelData);
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Presenças');
  
    const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
  
    const blob = new Blob([excelBuffer], {
      type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=utf-8',
    });
  
    const link = document.createElement("a");
    link.href = window.URL.createObjectURL(blob);
    link.setAttribute("download", sanitizeFilename(`Lista Presença - ${atividade.name}.xlsx`));
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="flex flex-col">
      <div className="flex flex-col py-5">
        <span><strong className="text-yellow-500">Atividade: </strong>{atividade.name}</span>
        <span><strong className="text-yellow-500">Responsáveis: </strong>{atividade.responsaveis}</span>
      </div>
      <div className="w-full overflow-x-auto rounded-lg">
        <table className="w-full">
          <thead className="bg-blue-950">
            <tr>
              <th
                scope="col"
                className="px-6 py-3 text-center text-xs font-medium text-white uppercase tracking-wider"
              >
                Nome
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-center text-xs font-medium text-white uppercase tracking-wider"
              >
                Email
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-center text-xs font-medium text-white uppercase tracking-wider"
              >
                Presença
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {data.map((item) => (
              <tr key={item.id}>
                <td className="px-6 py-4 whitespace-nowrap text-black text-center">
                  {item.name}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-black text-center">
                  {item.email}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-black text-center">
                  <input
                    type="checkbox"
                    className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                    defaultChecked={item.presenca}
                    onClick={(ref) => marcarPresenca(item.id, ref)}
                  />
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

PresencaTable.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      email: PropTypes.string.isRequired,
      presenca: PropTypes.bool.isRequired
    })
  ).isRequired,
  atividadeId: PropTypes.string.isRequired
};

export default PresencaTable;
