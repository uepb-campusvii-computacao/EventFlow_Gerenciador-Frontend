import { ChevronUp, ContactRound, LogOut, NotebookTabs } from 'lucide-react';

import { Avatar, AvatarImage } from '../ui/avatar';

import {
  DropdownMenu,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu';

import { SidebarMenu, SidebarMenuButton, SidebarMenuItem } from '../ui/sidebar';
import { DropdownMenuContent } from '@radix-ui/react-dropdown-menu';
import { useAuthContext } from '@/auth/hooks/useAuthContext';

interface NavUserFooterProps {
  isMobile: boolean;
}

export function NavUserFooter({ isMobile }: NavUserFooterProps) {
  const { logout } = useAuthContext();

  const handleLogout = () => {
    logout();
  };
  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size='lg'
              className='data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground'
            >
              <Avatar className='h-8 w-8 rounded-full'>
                <AvatarImage src='https://i.pinimg.com/736x/a3/54/f2/a354f2a3713632f175ffa37ef9a73a3b.jpg' />
              </Avatar>
              <ChevronUp className='ml-auto' />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className='w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg'
            side={isMobile ? 'bottom' : 'right'}
            align='end'
            sideOffset={4}
          >
            <DropdownMenuLabel className='p-0 font-normal'>
              <span>Nome do usuário</span>
              <span className='text-xs font-normal text-muted-foreground'>
                email.usuario@gmail.com
              </span>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <ContactRound className='mr-1 h-4 w-4' />
              <span>Meu perfil</span>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <NotebookTabs className='mr-1 h-4 w-4' />
              <span>Meus eventos</span>
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={handleLogout}
              className='text-rose-500 dark:text-rose-400'
            >
              <LogOut className='mr-1 h-4 w-4' />
              <span>Sair</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
