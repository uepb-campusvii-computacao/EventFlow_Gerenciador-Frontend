import { AuthProvider } from './auth/hooks/useAuthContext';
import { RoutesWrapper } from './routes';
import { ThemeProvider } from './core/theme/theme-provider';

import './index.css';

export function App() {
  return (
    <AuthProvider>
      <ThemeProvider storageKey='event-flow-theme' defaultTheme='light'>
        <RoutesWrapper />
      </ThemeProvider>
    </AuthProvider>
  );
}
