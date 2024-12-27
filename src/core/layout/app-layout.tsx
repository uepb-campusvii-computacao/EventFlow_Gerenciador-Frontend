import { Outlet } from 'react-router-dom';

import { SidebarProvider } from '@/core/components/ui/sidebar';
import { Header } from '@/core/components/Header';
import { AppSidebar } from '../components/Sidebar';
import { EventProvider } from '@/events/hooks/useEventsContext';

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
