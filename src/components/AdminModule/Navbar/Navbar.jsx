import AuthContext from "@/context/Auth/AuthContext";
import PropTypes from "prop-types";
import { useContext } from "react";
import { FaBars } from "react-icons/fa";

const Navbar = ({sidebarOpen, setSidebarOpen}) => {
  const { logout } = useContext(AuthContext);
  
  return (
    <div className="bg-gray-800 px-4 flex justify-between">
      <div className="flex items-center text-xl">
        <FaBars className="text-white me-4 cursor-pointer" onClick={() => setSidebarOpen(!sidebarOpen)}/>
        <span className="text-white font-semibold">Gerenciador de Eventos</span>
      </div>
      <div className="flex items-center gap-x-5">
        <div className="relative">
          <button className="text-white group">
            {/* Caso imagem seja nul null 
              <FaUserCircle className="w-6 h-6 mt-1" />
            */}
            <div className="relative">
              <img className="w-10 h-10 rounded-full mt-2 drop-shadow-md shadow-md" src="https://i.pinimg.com/736x/a3/54/f2/a354f2a3713632f175ffa37ef9a73a3b.jpg" alt="" />
              <span className="top-0 left-7 absolute  w-3.5 h-3.5 bg-green-400 border-2 border-white dark:border-gray-800 rounded-full"></span>
            </div>
            <div className="z-10 hidden bg-white absolute rounded-lg shadow w-32 group-focus:block top-full right-0">
              <ul className="py-2 text-sm">
                <li>
                  <a className="block px-4 py-2 text-gray-800 hover:bg-gray-200" onClick={() => logout()}>Log Out</a>
                </li>
              </ul>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
};

Navbar.propTypes = {
  sidebarOpen: PropTypes.bool.isRequired,
  setSidebarOpen: PropTypes.func.isRequired,
};

export default Navbar;
