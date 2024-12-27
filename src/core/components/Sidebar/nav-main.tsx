import { Link } from 'react-router-dom';

import {
  Activity,
  Calendar,
  ClipboardList,
  Home,
  Ticket,
  Users,
} from 'lucide-react';

import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '../ui/sidebar';

import { paths } from '@/paths';

export function NavMain() {
  return (
    <SidebarGroup>
      <SidebarGroupLabel>Páginas</SidebarGroupLabel>
      <SidebarMenu>
        <SidebarMenuItem>
          <SidebarMenuButton asChild>
            <Link to={paths.home}>
              <Home />
              <span>Dashboard</span>
            </Link>
          </SidebarMenuButton>
        </SidebarMenuItem>

        <SidebarMenuItem>
          <SidebarMenuButton asChild>
            <Link to={paths.eventos}>
              <Calendar className='h-6 w-6' />
              <span>Eventos</span>
            </Link>
          </SidebarMenuButton>
        </SidebarMenuItem>

        <SidebarMenuItem>
          <SidebarMenuButton asChild>
            <Link to={paths.lotes}>
              <Ticket className='h-6 w-6' />
              <span>Lotes</span>
            </Link>
          </SidebarMenuButton>
        </SidebarMenuItem>

        <SidebarMenuItem>
          <SidebarMenuButton asChild>
            <Link to={paths.credenciamento}>
              <ClipboardList className='h-6 w-6' />
              <span>Credenciamento</span>
            </Link>
          </SidebarMenuButton>
        </SidebarMenuItem>

        <SidebarMenuItem>
          <SidebarMenuButton asChild>
            <Link to={paths.inscritos}>
              <Users className='h-6 w-6' />
              <span>Inscritos</span>
            </Link>
          </SidebarMenuButton>
        </SidebarMenuItem>

        <SidebarMenuItem>
          <SidebarMenuButton asChild>
            <Link to={paths.atividades}>
              <Activity className='h-6 w-6' />
              <span>Atividades</span>
            </Link>
          </SidebarMenuButton>
        </SidebarMenuItem>
      </SidebarMenu>
    </SidebarGroup>
  );
}
