
import React, { useState, useEffect } from 'react';
import ChatSidebar from '@/components/chat/ChatSidebar';
import ChatWindow from '@/components/chat/ChatWindow';
import { useWebSocket } from '@/services/websocketService';
import { useToast } from '@/hooks/use-toast';

const Messages: React.FC = () => {
  const { connected } = useWebSocket();
  const { toast } = useToast();
  
  useEffect(() => {
    // Notify users about the real-time status when the page loads
    if (connected) {
      toast({
        title: "Real-time Chat Active",
        description: "You can now chat in real-time with your friends",
      });
    } else {
      toast({
        title: "Chat offline",
        description: "Real-time messaging is currently offline",
        variant: "destructive",
      });
    }
  }, [connected, toast]);

  return (
    <div className="container h-[calc(100vh-4rem)] py-6">
      <div className="grid grid-cols-1 md:grid-cols-3 h-full gap-6 overflow-hidden rounded-lg border shadow-sm">
        <div className="md:col-span-1 border-r">
          <ChatSidebar />
        </div>
        <div className="md:col-span-2 hidden md:block">
          <ChatWindow />
        </div>
      </div>
    </div>
  );
};

export default Messages;
