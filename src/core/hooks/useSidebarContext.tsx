import { createContext, ReactNode, useContext, useState } from 'react';

interface SidebarContextProps {
  sidebarOpen: boolean;
  setSidebarOpen: (value: boolean) => void;
}

const SidebarContext = createContext({} as SidebarContextProps);

interface SidebarProviderProps {
  children: ReactNode;
}

export function SidebarProvider({ children }: SidebarProviderProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <SidebarContext.Provider value={{ sidebarOpen, setSidebarOpen }}>
      {children}
    </SidebarContext.Provider>
  );
}

export function useSidebarContext() {
  const context = useContext(SidebarContext);
  return context;
}
