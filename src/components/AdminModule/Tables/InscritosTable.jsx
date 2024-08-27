import { DownloadSimple, Funnel, MagnifyingGlass } from "@phosphor-icons/react";
import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import { FaEdit } from "react-icons/fa";
import * as XLSX from "xlsx";
import paths from "@/paths.js";
import Pagination from "@/components/ui/Pagination.jsx";
import Popover from "../../ui/Popover";

const InscritosTable = ({ data }) => {
  const [users, setUsers] = useState(data);
  const [currentPage, setCurrentPage] = useState(1);

  const [filterOpen, setFilterOpen] = useState(false);

  const [filter, setFilter] = useState("");

  const [usersPerPage] = useState(20);

  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = users.slice(indexOfFirstUser, indexOfLastUser);

  function searchUser(nome_user) {
    const filteredUsers = data.filter((user) =>
      user.name.toLowerCase().includes(nome_user.toLowerCase())
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
      [
        "ID",
        "Nome",
        "Nome no crachá",
        "Email",
        "Status Pagamento",
        "Credenciamento",
      ], // Cabeçalho
      ...data.map((item) => [
        item.id,
        item.name,
        item.nome_cracha,
        item.email,
        item.paymentStatus,
        item.credential ? "Sim" : "Não",
      ]),
    ];

    const workbook = XLSX.utils.book_new();

    const worksheet = XLSX.utils.aoa_to_sheet(excelData);

    worksheet["!cols"] = [
      { wch: 40 },
      { wch: 40 },
      { wch: 30 },
      { wch: 40 },
      { wch: 20 },
      { wch: 20 },
    ];

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
    link.setAttribute("download", "Inscrições.xlsx");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  function toggleFilter(value) {
    if (filter === value) {
      setFilter("")
      setUsers(data);
    } else {
      setFilter(value);
      setUsers(data.filter((item) => item.paymentStatus === value));
    }
  }

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
        <Popover
          open={filterOpen}
          togglePopover={() => setFilterOpen(!filterOpen)}
          icon={<Funnel size={28} />}
        >
          <div className="text-black flex flex-col gap-2">
            <label
              htmlFor="realizado"
              className={`bg-gray-200 px-3 py-2 text-sm rounded-md hover:bg-gray-400 transition-colors ${
                filter === "REALIZADO" && "bg-gray-400"
              }`}
            >
              <input
                onChange={(e) => toggleFilter(e.target.value)}
                value="REALIZADO"
                checked={filter === "REALIZADO"}
                className="hidden"
                type="checkbox"
                name=""
                id="realizado"
              />
              <span>REALIZADO</span>
            </label>
            <label
              htmlFor="pedente"
              className={`bg-gray-200 px-3 py-2 text-sm rounded-md hover:bg-gray-400 transition-colors ${
                filter === "PENDENTE" && "bg-gray-400"
              }`}
            >
              <input
                onChange={(e) => toggleFilter(e.target.value)}
                value="PENDENTE"
                checked={filter === "pedente"}
                className="hidden"
                type="checkbox"
                name=""
                id="pedente"
              />
              <span>PENDENTE</span>
            </label>
            <label
              htmlFor="gratuito"
              className={`bg-gray-200 px-3 py-2 text-sm rounded-md hover:bg-gray-400 transition-colors ${
                filter === "GRATUITO" && "bg-gray-400"
              }`}
            >
              <input
                onChange={(e) => toggleFilter(e.target.value)}
                value="GRATUITO"
                checked={filter === "gratuito"}
                className="hidden"
                type="checkbox"
                name=""
                id="gratuito"
              />
              <span>GRATUITO</span>
            </label>
            <label
              htmlFor="expirado"
              className={`bg-gray-200 px-3 py-2 text-sm rounded-md hover:bg-gray-400 transition-colors ${
                filter === "GRATUITO" && "bg-gray-400"
              }`}
            >
              <input
                onChange={(e) => toggleFilter(e.target.value)}
                value="EXPIRADO"
                checked={filter === "expirado"}
                className="hidden"
                type="checkbox"
                name=""
                id="expirado"
              />
              <span>EXPIRADO</span>
            </label>
          </div>
        </Popover>
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
              <th scope="col" className="hidden">
                ID
              </th>
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
                Nome no crachá
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
                Status Pagamento
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
            {currentUsers.map((item) => (
              <tr key={item.id}>
                <td className="hidden">{item.id}</td>
                <td className={`px-6 py-4 whitespace-nowrap ${item.cor_texto} text-center`}>
                  {item.name}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-black text-center">
                  {item.nome_cracha}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-black text-center">
                  {item.email}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-black text-center flex justify-center">
                  {item.paymentStatus === "REALIZADO" ? (
                    <span className="bg-green-100 text-green-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded dark:bg-green-900 dark:text-green-300">
                      {item.paymentStatus}
                    </span>
                  ) : item.paymentStatus === "PENDENTE" || item.paymentStatus === "EXPIRADO" ? (
                    <span className="bg-red-100 text-red-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded dark:bg-red-900 dark:text-red-300">
                      {item.paymentStatus}
                    </span>
                  ) : (
                    <span className="bg-gray-400 text-white text-xs font-medium me-2 px-2.5 py-0.5 rounded dark:bg-gray-400 dark:text-white">
                      {item.paymentStatus}
                    </span>
                  )}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-black text-center">
                  <a
                    href={`${paths.participante}/editar/${item.id}`}
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

InscritosTable.propTypes = {
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

export default InscritosTable;
