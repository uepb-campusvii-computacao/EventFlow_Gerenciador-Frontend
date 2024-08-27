import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Title from "@/components/ui/Title";
import axiosInstance from "@/axiosInstance";
import moment from "moment";

const getOrdersDataEndpoint = (user_id, produto_id) => {
  return `/admin/loja/usuario/${user_id}/compras/produto/${produto_id}`;
};

const AdminCompras = () => {
  const { user_id, produto_id } = useParams();

  const [compras, setCompras] = useState([]);

  async function fetchData() {
    const { data } = await axiosInstance.get(
      getOrdersDataEndpoint(user_id, produto_id)
    );

    setCompras(data);
  }

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div>
      <Title title="Compras" />
      <div className="w-full overflow-x-auto rounded-lg">
        <table className="w-full">
          <thead className="bg-indigo-500">
            <tr>
              <th
                scope="col"
                className="px-6 py-3 text-center text-xs font-medium text-white uppercase tracking-wider"
              >
                Data criação
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-center text-xs font-medium text-white uppercase tracking-wider"
              >
                Data pagamento
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-center text-xs font-medium text-white uppercase tracking-wider"
              >
                Quantidade
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-center text-xs font-medium text-white uppercase tracking-wider"
              >
                Valor total (R$)
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-center text-xs font-medium text-white uppercase tracking-wider"
              >
                Status pagamento
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {compras.map((item, index) => (
              <tr key={index}>
                <td
                  className={`px-6 py-4 text-black whitespace-nowrap text-center`}
                >
                  {moment(item.data_criacao).format("DD/MM/YYYY HH:mm:ss")}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-black text-center">
                  {item.data_pagamento
                    ? moment(item.data_pagamento).format("DD/MM/YYYY HH:mm:ss")
                    : "---"}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-black text-center">
                  {item.quantidade}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-black text-center">
                  {item.valor_total}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-black text-center flex justify-center">
                  {item.status_pagamento === "REALIZADO" ? (
                    <span className="bg-green-100 text-green-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded dark:bg-green-900 dark:text-green-300">
                      {item.status_pagamento}
                    </span>
                  ) : item.status_pagamento === "PENDENTE" ? (
                    <span className="bg-red-100 text-red-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded dark:bg-red-900 dark:text-red-300">
                      {item.status_pagamento}
                    </span>
                  ) : (
                    <span className="bg-gray-400 text-white text-xs font-medium me-2 px-2.5 py-0.5 rounded dark:bg-gray-400 dark:text-white">
                      {item.status_pagamento}
                    </span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminCompras;
