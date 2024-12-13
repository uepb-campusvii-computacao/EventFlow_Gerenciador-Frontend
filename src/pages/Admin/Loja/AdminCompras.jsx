import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Title from '@/components/ui/Title';
import axiosInstance from '../../../axiosInstance';
import moment from 'moment';

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
      <Title title='Compras' />
      <div className='w-full overflow-x-auto rounded-lg'>
        <table className='w-full'>
          <thead className='bg-indigo-500'>
            <tr>
              <th
                scope='col'
                className='px-6 py-3 text-center text-xs font-medium uppercase tracking-wider text-white'
              >
                Data criação
              </th>
              <th
                scope='col'
                className='px-6 py-3 text-center text-xs font-medium uppercase tracking-wider text-white'
              >
                Data pagamento
              </th>
              <th
                scope='col'
                className='px-6 py-3 text-center text-xs font-medium uppercase tracking-wider text-white'
              >
                Quantidade
              </th>
              <th
                scope='col'
                className='px-6 py-3 text-center text-xs font-medium uppercase tracking-wider text-white'
              >
                Valor total (R$)
              </th>
              <th
                scope='col'
                className='px-6 py-3 text-center text-xs font-medium uppercase tracking-wider text-white'
              >
                Status pagamento
              </th>
            </tr>
          </thead>
          <tbody className='divide-y divide-gray-200 bg-white'>
            {compras.map((item, index) => (
              <tr key={index}>
                <td
                  className={`whitespace-nowrap px-6 py-4 text-center text-black`}
                >
                  {moment(item.data_criacao).format('DD/MM/YYYY HH:mm:ss')}
                </td>
                <td className='whitespace-nowrap px-6 py-4 text-center text-black'>
                  {item.data_pagamento
                    ? moment(item.data_pagamento).format('DD/MM/YYYY HH:mm:ss')
                    : '---'}
                </td>
                <td className='whitespace-nowrap px-6 py-4 text-center text-black'>
                  {item.quantidade}
                </td>
                <td className='whitespace-nowrap px-6 py-4 text-center text-black'>
                  {item.valor_total}
                </td>
                <td className='flex justify-center whitespace-nowrap px-6 py-4 text-center text-black'>
                  {item.status_pagamento === 'REALIZADO' ? (
                    <span className='me-2 rounded bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-800 dark:bg-green-900 dark:text-green-300'>
                      {item.status_pagamento}
                    </span>
                  ) : item.status_pagamento === 'PENDENTE' ? (
                    <span className='me-2 rounded bg-red-100 px-2.5 py-0.5 text-xs font-medium text-red-800 dark:bg-red-900 dark:text-red-300'>
                      {item.status_pagamento}
                    </span>
                  ) : (
                    <span className='me-2 rounded bg-gray-400 px-2.5 py-0.5 text-xs font-medium text-white dark:bg-gray-400 dark:text-white'>
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
