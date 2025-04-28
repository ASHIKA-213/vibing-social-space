
import React from 'react';
import { 
  Sidebar, 
  SidebarContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarHeader,
  SidebarFooter,
} from '@/components/ui/sidebar';
import { Link } from 'react-router-dom';
import { Home, Users, MessageCircle, User, Bell } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

const menuItems = [
  {
    icon: Home,
    label: 'Home',
    path: '/',
  },
  {
    icon: Users,
    label: 'Friends',
    path: '/friends',
  },
  {
    icon: MessageCircle,
    label: 'Messages',
    path: '/messages',
  },
  {
    icon: Bell,
    label: 'Notifications',
    path: '/notifications',
  },
  {
    icon: User,
    label: 'Profile',
    path: '/profile',
  },
];

const AppSidebar = () => {
  return (
    <Sidebar>
      <SidebarHeader className="p-4">
        <Link to="/" className="flex items-center space-x-2">
          <div className="w-8 h-8 rounded-full vibely-gradient"></div>
          <span className="text-xl font-bold vibely-gradient-text">Vibely</span>
        </Link>
      </SidebarHeader>
      
      <SidebarContent>
        <SidebarMenu>
          {menuItems.map((item) => (
            <SidebarMenuItem key={item.path}>
              <SidebarMenuButton asChild>
                <Link to={item.path} className="flex items-center gap-3 py-2 px-3">
                  <item.icon className="w-5 h-5" />
                  <span>{item.label}</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarContent>
      
      <SidebarFooter className="p-4">
        <div className="flex items-center gap-3">
          <Avatar>
            <AvatarImage src="https://images.unsplash.com/photo-1649972904349-6e44c42644a7?w=128&h=128&fit=crop&crop=face" alt="User" />
            <AvatarFallback>UN</AvatarFallback>
          </Avatar>
          <div className="flex flex-col">
            <span className="font-medium text-sm">Sarah Connor</span>
            <span className="text-xs text-muted-foreground">@sarahc</span>
          </div>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
};

export default AppSidebar;
