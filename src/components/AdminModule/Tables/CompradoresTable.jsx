import { DownloadSimple, MagnifyingGlass } from "@phosphor-icons/react";
import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import * as XLSX from "xlsx";
import paths from "@/paths.js";
import Pagination from "@/components/ui/Pagination.jsx";

const CompradoresTable = ({ data, produto_id }) => {
  const [users, setUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 20;

  useEffect(() => {
    const mappedResponse = data.map((item) => {
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
    const filteredUsers = data.filter((user) =>
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

  const paginateToggle = (page_number) => {
    setCurrentPage(page_number);
  };

  const convertToExcel = () => {
    const excelData = [
      ["ID", "Nome", "Email"], // Cabeçalho
      ...data.map((item) => [
        item.uuid_user, // Verifique se esta chave está correta
        item.nome,
        item.email,
      ]),
    ];

    const workbook = XLSX.utils.book_new();
    const worksheet = XLSX.utils.aoa_to_sheet(excelData);
    worksheet["!cols"] = [{ wch: 40 }, { wch: 40 }, { wch: 40 }];

    XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");

    const excelBuffer = XLSX.write(workbook, {
      bookType: "xlsx",
      type: "array",
    });

    const blob = new Blob([excelBuffer], {
      type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=utf-8",
    });

    const link = document.createElement("a");
    link.href = window.URL.createObjectURL(blob);
    link.setAttribute("download", "Compradores.xlsx");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="flex flex-col">
      <div className="relative flex items-center w-full my-4 gap-4">
        <input
          onChange={(e) => searchUser(e.target.value)}
          className="rounded-md bg-white px-3 py-2 text-gray-600 w-full pl-12"
          placeholder="Pesquise pelo nome"
          type="text"
        />
        <MagnifyingGlass
          className="absolute left-3"
          color="#1d4ed8"
          size={24}
        />
        <button
          onClick={convertToExcel}
          title="Exportar XLSX"
          className="bg-green-500 text-white p-2 rounded-md"
        >
          <DownloadSimple size={28} />
        </button>
      </div>
      <div className="w-full overflow-x-auto rounded-lg">
        <table className="w-full">
          <thead className="bg-indigo-500">
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
                Compras
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {currentUsers.map((item) => (
              <tr key={item.uuid_user}>
                <td className="px-6 py-4 whitespace-nowrap text-black text-center">
                  {item.nome}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-black text-center">
                  {item.email}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-black text-center">
                  <a
                    href={`${paths.loja}/usuario/${item.uuid_user}/compras/${produto_id}`}
                    className="text-blue-500 hover:text-blue-700 w-full flex items-center justify-center"
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
        <div className="flex items-center w-full justify-center px-8 py-3">
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
