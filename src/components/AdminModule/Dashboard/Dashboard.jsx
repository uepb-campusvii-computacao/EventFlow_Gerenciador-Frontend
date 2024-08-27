import SidebarContext from "@/context/Sidebar/SidebarContext";
import { useContext } from 'react';
import Navbar from '../Navbar/Navbar';

const Dashboard = () => {
  const { sidebarOpen, setSidebarOpen } = useContext(SidebarContext);

  return (
    <div className={`w-full`}>
      <Navbar 
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
      />
    </div>
  )
}
export default Dashboard
