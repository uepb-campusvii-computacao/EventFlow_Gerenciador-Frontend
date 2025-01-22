import { QueryClientProvider } from '@tanstack/react-query';

import { queryClient } from './core/lib/react-query';
import { AuthProvider } from './auth/hooks/useAuthContext';
import { RoutesWrapper } from './routes';
import { ThemeProvider } from './core/theme/theme-provider';

import './index.css';

export function App() {
  return (
    <AuthProvider>
      <ThemeProvider storageKey='event-flow-theme' defaultTheme='light'>
        <QueryClientProvider client={queryClient}>
          <RoutesWrapper />
        </QueryClientProvider>
      </ThemeProvider>
    </AuthProvider>
  );
}
