import { Outlet } from 'react-router-dom';

import { SidebarProvider } from '@/core/components/ui/sidebar';
import { AppSidebar } from '../components/Sidebar';
import { EventProvider } from '@/events/hooks/useEventsContext';
import { Header } from '../components/ui/header';

export function AppLayout() {
  return (
    <div className='flex min-h-screen antialiased'>
      <SidebarProvider>
        <AppSidebar />
        <main className='flex min-h-screen w-full flex-col'>
          <EventProvider>
            <Header />
            <div className='flex flex-1 flex-col gap-4 p-8'>
              <Outlet />
            </div>
          </EventProvider>
        </main>
      </SidebarProvider>
    </div>
  );
}
