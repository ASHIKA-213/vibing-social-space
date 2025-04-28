
import React, { useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Navbar from './Navbar';
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';
import AppSidebar from '@/components/sidebar/AppSidebar';
import { useWebSocket } from '@/services/websocketService';

const Layout: React.FC = () => {
  const location = useLocation();
  const isLandingPage = location.pathname === '/';
  const { connected } = useWebSocket();
  
  // Log WebSocket connection status 
  useEffect(() => {
    console.log('WebSocket connection status:', connected ? 'Connected' : 'Disconnected');
  }, [connected]);

  return (
    <>
      {isLandingPage ? (
        <Outlet />
      ) : (
        <SidebarProvider>
          <div className="flex min-h-screen w-full bg-[#fafafa] dark:bg-black">
            <AppSidebar />
            <div className="flex flex-col flex-1">
              <Navbar />
              <main className="flex-1 pt-16">
                <SidebarTrigger className="lg:hidden fixed left-4 top-4 z-50" />
                <Outlet />
              </main>
            </div>
          </div>
        </SidebarProvider>
      )}
    </>
  );
};

export default Layout;
