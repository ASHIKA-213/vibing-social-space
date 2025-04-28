
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Bell, MessageCircle, Search, User } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

const Navbar = () => {
  return (
    <nav className="sticky top-0 z-10 w-full bg-white border-b shadow-sm">
      <div className="flex items-center justify-between h-16 px-4 mx-auto max-w-7xl">
        <div className="flex items-center">
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 rounded-full vibely-gradient"></div>
            <span className="text-xl font-bold vibely-gradient-text">Vibely</span>
          </Link>
        </div>

        <div className="hidden md:flex items-center px-4 py-1.5 bg-gray-100 rounded-full w-[300px]">
          <Search className="w-4 h-4 mr-2 text-gray-500" />
          <Input 
            type="text" 
            placeholder="Search..." 
            className="border-0 bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 h-8"
          />
        </div>

        <div className="flex items-center space-x-4">
          <Button variant="ghost" size="icon" className="rounded-full">
            <Bell className="w-5 h-5" />
          </Button>
          <Button variant="ghost" size="icon" className="rounded-full">
            <MessageCircle className="w-5 h-5" />
          </Button>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                <Avatar className="h-8 w-8">
                  <AvatarImage src="https://images.unsplash.com/photo-1649972904349-6e44c42644a7?w=128&h=128&fit=crop&crop=face" alt="@user" />
                  <AvatarFallback>UN</AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56" align="end" forceMount>
              <DropdownMenuLabel className="font-normal">
                <div className="flex flex-col space-y-1">
                  <p className="text-sm font-medium leading-none">Sarah Connor</p>
                  <p className="text-xs leading-none text-muted-foreground">
                    sarahconnor@example.com
                  </p>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <User className="w-4 h-4 mr-2" />
                <span>Profile</span>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <MessageCircle className="w-4 h-4 mr-2" />
                <span>Messages</span>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                Log out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
