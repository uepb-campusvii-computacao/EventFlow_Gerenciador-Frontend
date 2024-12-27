import { ComponentProps } from 'react';

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroupLabel,
  SidebarHeader,
  useSidebar,
} from '../ui/sidebar';

import logo from '../../../assets/images/logo.png';

import { NavUserFooter } from './nav-user-footer';
import { NavMain } from './nav-main';

export function AppSidebar({ ...props }: ComponentProps<typeof Sidebar>) {
  const { open, isMobile } = useSidebar();

  return (
    <Sidebar variant='floating' collapsible='icon' {...props}>
      <SidebarHeader>
        <img
          src={logo}
          className={open ? '' : 'hidden'}
          alt='Logo do event-flow'
        />
        <SidebarGroupLabel>Navegue por aqui!</SidebarGroupLabel>
      </SidebarHeader>
      <SidebarContent>
        <NavMain />
      </SidebarContent>
      <SidebarFooter>
        <NavUserFooter isMobile={isMobile} />
      </SidebarFooter>
    </Sidebar>
  );
}
