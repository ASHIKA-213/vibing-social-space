
import React from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Input } from '@/components/ui/input';
import { Search, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';

interface ChatUser {
  id: string;
  name: string;
  avatar: string;
  status: 'online' | 'offline';
  lastMessage: string;
  time: string;
  unread?: number;
}

const users: ChatUser[] = [
  {
    id: '1',
    name: 'Sarah Connor',
    avatar: 'https://images.unsplash.com/photo-1649972904349-6e44c42644a7?w=128&h=128&fit=crop&crop=face',
    status: 'online',
    lastMessage: 'Hey, how are you doing?',
    time: '2m',
    unread: 1,
  },
  {
    id: '2',
    name: 'John Doe',
    avatar: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=128&h=128&fit=crop&crop=face',
    status: 'online',
    lastMessage: 'Did you see that new post?',
    time: '1h',
  },
  {
    id: '3',
    name: 'Alex Morgan',
    avatar: 'https://images.unsplash.com/photo-1721322800607-8c38375eef04?w=128&h=128&fit=crop&crop=face',
    status: 'offline',
    lastMessage: 'Thanks for the help!',
    time: '5h',
  },
  {
    id: '4',
    name: 'Jessica Alba',
    avatar: '',
    status: 'offline',
    lastMessage: 'Let me know when you\'re free',
    time: '1d',
  },
];

const ChatUser: React.FC<{ user: ChatUser; isActive?: boolean }> = ({ user, isActive }) => {
  return (
    <div
      className={`flex items-center p-3 gap-3 rounded-lg cursor-pointer transition-colors ${
        isActive ? 'bg-secondary' : 'hover:bg-secondary/50'
      }`}
    >
      <div className="relative">
        <Avatar>
          <AvatarImage src={user.avatar} />
          <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
        </Avatar>
        {user.status === 'online' && (
          <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></span>
        )}
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex justify-between">
          <p className="font-medium truncate">{user.name}</p>
          <span className="text-xs text-muted-foreground">{user.time}</span>
        </div>
        <p className="text-sm text-muted-foreground truncate">{user.lastMessage}</p>
      </div>
      {user.unread && (
        <div className="flex items-center justify-center w-5 h-5 text-xs font-bold text-white bg-primary rounded-full">
          {user.unread}
        </div>
      )}
    </div>
  );
};

const ChatSidebar: React.FC = () => {
  return (
    <div className="w-full h-full flex flex-col bg-white border-r">
      <div className="p-4 border-b">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold">Messages</h2>
          <Button size="icon" variant="ghost" className="rounded-full">
            <Plus className="w-5 h-5" />
          </Button>
        </div>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
          <Input placeholder="Search messages..." className="pl-9" />
        </div>
      </div>
      <ScrollArea className="flex-1">
        <div className="px-2 py-3">
          {users.map((user, index) => (
            <ChatUser key={user.id} user={user} isActive={index === 0} />
          ))}
        </div>
      </ScrollArea>
    </div>
  );
};

export default ChatSidebar;
