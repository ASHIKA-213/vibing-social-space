
import React, { useState } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Send, Image, Plus } from 'lucide-react';

interface Message {
  id: string;
  content: string;
  sender: 'user' | 'other';
  timestamp: string;
}

const messages: Message[] = [
  {
    id: '1',
    content: 'Hey, how are you doing?',
    sender: 'other',
    timestamp: '10:31 AM',
  },
  {
    id: '2',
    content: "I'm good! Working on the real-time chat feature for our app.",
    sender: 'user',
    timestamp: '10:32 AM',
  },
  {
    id: '3',
    content: 'That sounds awesome! How's it coming along?',
    sender: 'other',
    timestamp: '10:33 AM',
  },
  {
    id: '4',
    content: "Making good progress! I'm using WebSockets for the real-time functionality.",
    sender: 'user',
    timestamp: '10:35 AM',
  },
  {
    id: '5',
    content: 'WebSockets are perfect for that. Are you handling message delivery confirmation too?',
    sender: 'other',
    timestamp: '10:36 AM',
  },
  {
    id: '6',
    content: 'Yes, I'm implementing read receipts and typing indicators as well.',
    sender: 'user',
    timestamp: '10:38 AM',
  },
];

const ChatWindow: React.FC = () => {
  const [newMessage, setNewMessage] = useState('');

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim()) return;
    
    console.log('Send message:', newMessage);
    setNewMessage('');
    // In a real app, this would add the message to the chat
  };

  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center justify-between p-4 border-b">
        <div className="flex items-center">
          <Avatar className="h-9 w-9 mr-3">
            <AvatarImage src="https://images.unsplash.com/photo-1649972904349-6e44c42644a7?w=128&h=128&fit=crop&crop=face" />
            <AvatarFallback>SC</AvatarFallback>
          </Avatar>
          <div>
            <h3 className="font-semibold">Sarah Connor</h3>
            <p className="text-xs text-muted-foreground">Online</p>
          </div>
        </div>
      </div>

      <ScrollArea className="flex-1 p-4">
        <div className="space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-[80%] rounded-2xl px-4 py-2 ${
                  message.sender === 'user'
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-secondary text-secondary-foreground'
                }`}
              >
                <div className="break-words">{message.content}</div>
                <div
                  className={`text-xs mt-1 ${
                    message.sender === 'user' ? 'text-primary-foreground/70' : 'text-muted-foreground'
                  }`}
                >
                  {message.timestamp}
                </div>
              </div>
            </div>
          ))}
        </div>
      </ScrollArea>

      <div className="p-4 border-t">
        <form onSubmit={handleSendMessage} className="flex items-center gap-2">
          <Button type="button" size="icon" variant="ghost" className="rounded-full">
            <Plus className="h-5 w-5" />
          </Button>
          <Button type="button" size="icon" variant="ghost" className="rounded-full">
            <Image className="h-5 w-5" />
          </Button>
          <Input
            placeholder="Type a message..."
            className="flex-1"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
          />
          <Button type="submit" size="icon" className="rounded-full" disabled={!newMessage.trim()}>
            <Send className="h-4 w-4" />
          </Button>
        </form>
      </div>
    </div>
  );
};

export default ChatWindow;
