import { Outlet } from 'react-router-dom';
import { SidebarProvider } from '../../hooks/useSidebarContext';
import { Sidebar } from '../../components/Sidebar';
import { EventProvider } from '../../../events/hooks/useEventsContext';
import { Dashboard } from '../../components/Dashboard';

export function Layout() {
  return (
    <SidebarProvider>
      <div className='flex h-screen flex-row'>
        <div className='h-full'>
          <Sidebar />
        </div>
        <div className='w-full'>
          <EventProvider>
            <Dashboard />
            <div className='container mx-auto px-5'>
              <Outlet />
            </div>
          </EventProvider>
        </div>
      </div>
    </SidebarProvider>
  );
}
