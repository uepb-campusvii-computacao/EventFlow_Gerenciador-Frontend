import { useEffect, useState } from 'react';
import { FaBars } from 'react-icons/fa';
import { useAuthContext } from '../../../auth/hooks/useAuthContext';
import { useSidebarContext } from '../../hooks/useSidebarContext';
import { useEventsContext } from '../../../events/hooks/useEventsContext';

export function Navbar() {
  const { setSidebarOpen, sidebarOpen } = useSidebarContext();
  const { currentEvent, getEventDataById } = useEventsContext();
  const { logout } = useAuthContext();

  const [title, setTitle] = useState('Gerenciador de Eventos');

  useEffect(() => {
    setTitle(currentEvent.nome);
  }, [currentEvent, getEventDataById]);

  return (
    <div className='flex justify-between bg-gray-800 px-4'>
      <div className='flex items-center text-xl'>
        <FaBars
          className='me-4 cursor-pointer text-white'
          onClick={() => setSidebarOpen(!sidebarOpen)}
        />
        <span className='font-semibold text-white'>{title}</span>
      </div>
      <div className='flex items-center gap-x-5'>
        <div className='relative'>
          <button className='group text-white'>
            {/* Caso imagem seja nul null
              <FaUserCircle className="w-6 h-6 mt-1" />
            */}
            <div className='relative'>
              <img
                className='mt-2 h-10 w-10 rounded-full shadow-md drop-shadow-md'
                src='https://i.pinimg.com/736x/a3/54/f2/a354f2a3713632f175ffa37ef9a73a3b.jpg'
                alt=''
              />
              <span className='absolute left-7 top-0 h-3.5 w-3.5 rounded-full border-2 border-white bg-green-400 dark:border-gray-800'></span>
            </div>
            <div className='absolute right-0 top-full z-10 hidden w-32 rounded-lg bg-white shadow group-focus:block'>
              <ul className='py-2 text-sm'>
                <li>
                  <a
                    className='block px-4 py-2 text-gray-800 hover:bg-gray-200'
                    onClick={() => logout()}
                  >
                    Log Out
                  </a>
                </li>
              </ul>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
}
