import logo from '@/assets/images/logo.png';
import SidebarContext from '@/context/Sidebar/SidebarContext';
import { paths } from '@/paths';
import PropTypes from 'prop-types';
import { useContext } from 'react';
import {
  FaAddressCard,
  FaBirthdayCake,
  FaGift,
  FaHome,
  FaShoppingCart,
  FaUserEdit,
} from 'react-icons/fa';
import { FaTicket, FaUserGroup } from 'react-icons/fa6';
import { Link } from 'react-router-dom';

const SidebarItem = ({ nome, link, icon }) => {
  return (
    <Link
      to={link}
      className='flex items-center rounded-lg px-3 py-2 hover:bg-blue-500'
    >
      {icon}
      <span>{nome}</span>
    </Link>
  );
};

const Sidebar = () => {
  const { sidebarOpen } = useContext(SidebarContext);

  return (
    <div
      className={`${
        sidebarOpen ? 'block' : 'hidden'
      } h-full w-64 bg-gray-800 px-4 py-2`}
    >
      <div>
        <div className='flex flex-col items-center justify-center py-3'>
          <img src={logo} />
        </div>
        <hr className='my-4 h-px border-0 bg-gray-200 dark:bg-gray-700' />
        <ul className='mt-3 font-bold text-white'>
          <li className='mb-2 rounded hover:shadow'>
            <SidebarItem
              nome='Home'
              link={paths.home}
              icon={<FaHome className='-mt-1 mr-2 h-6 w-6' />}
            />
          </li>
          <li className='mb-2 rounded hover:shadow'>
            <SidebarItem
              nome='Eventos'
              link={paths.eventos}
              icon={<FaBirthdayCake className='-mt-1 mr-2 h-6 w-6' />}
            />
          </li>
          <li className='mb-2 rounded hover:shadow'>
            <SidebarItem
              nome='Lotes'
              link={paths.lotes}
              icon={<FaTicket className='-mt-1 mr-2 h-6 w-6' />}
            />
          </li>
          <li className='mb-2 rounded hover:shadow'>
            <SidebarItem
              nome='Credenciamento'
              link={paths.credenciamento}
              icon={<FaAddressCard className='-mt-1 mr-2 h-6 w-6' />}
            />
          </li>
          <li className='mb-2 rounded hover:shadow'>
            <SidebarItem
              nome='Inscritos'
              link={paths.inscritos}
              icon={<FaUserEdit className='-mt-1 mr-2 h-6 w-6' />}
            />
          </li>
          <li className='mb-2 rounded hover:shadow'>
            <SidebarItem
              nome='Sorteio Inscritos'
              link={paths.sorteio_inscritos}
              icon={<FaGift className='-mt-1 mr-2 h-6 w-6' />}
            />
          </li>
          <li className='mb-2 rounded hover:shadow'>
            <SidebarItem
              nome='Atividades'
              link={paths.atividades}
              icon={<FaUserGroup className='-mt-1 mr-2 h-6 w-6' />}
            />
          </li>
          {/* <li className='mb-2 rounded hover:shadow'>
            <SidebarItem
              nome='Loja'
              link={paths.loja}
              icon={<FaShoppingCart className='-mt-1 mr-2 h-6 w-6' />}
            />
          </li> */}
        </ul>
      </div>
    </div>
  );
};

SidebarItem.propTypes = {
  nome: PropTypes.string.isRequired,
  link: PropTypes.string.isRequired,
  icon: PropTypes.node.isRequired,
};

export default Sidebar;
