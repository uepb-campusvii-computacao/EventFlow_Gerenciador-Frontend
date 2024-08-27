import { EventProvider } from "@/context/Event/EventContext";
import { SidebarProvider } from "@/context/Sidebar/SidebarContext";
import { Outlet } from "react-router-dom";
import Dashboard from "../Dashboard/Dashboard";
import Sidebar from "../Sidebar/Sidebar";

const Layout = () => {
  return (
    <SidebarProvider>
      <div className="flex flex-row h-screen">
        <div className="h-full">
          <Sidebar />
        </div>
        <div className="w-full">
          <Dashboard />
          <EventProvider>
            <div className="container mx-auto px-5">
              <Outlet />
            </div>
          </EventProvider>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default Layout;
