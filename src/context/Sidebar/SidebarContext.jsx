import PropTypes from 'prop-types';
import { createContext, useState } from 'react';

const SidebarContext = createContext();

export const SidebarProvider = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <SidebarContext.Provider value={{ sidebarOpen, setSidebarOpen }}>
      {children}
    </SidebarContext.Provider>
  );
};

SidebarProvider.propTypes = {
    children: PropTypes.node.isRequired,
};

export default SidebarContext;
