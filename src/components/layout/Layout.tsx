
import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Navbar from './Navbar';
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';
import AppSidebar from '@/components/sidebar/AppSidebar';

const Layout: React.FC = () => {
  const location = useLocation();
  const isLandingPage = location.pathname === '/';

  return (
    <>
      {isLandingPage ? (
        <Outlet />
      ) : (
        <SidebarProvider>
          <div className="flex min-h-screen w-full">
            <AppSidebar />
            <div className="flex flex-col flex-1">
              <Navbar />
              <main className="flex-1 bg-gray-50">
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
