import { useEventsContext } from '../../../events/hooks/useEventsContext';
import { SidebarTrigger } from '../ui/sidebar';
import { Separator } from '../ui/separator';
import { ThemeToggle } from '@/core/theme/theme-toggle';

export function Header() {
  const { currentEvent } = useEventsContext();

  return (
    <div className='border-b'>
      <div className='flex h-16 items-center gap-6 px-6'>
        <div>
          <span className='text-lg font-semibold text-muted-foreground'>
            {currentEvent.nome}
          </span>
        </div>

        <Separator orientation='vertical' />

        <div className='ml-auto flex items-center justify-center gap-2'>
          <SidebarTrigger />
          <ThemeToggle />
        </div>
      </div>
    </div>
  );
}
