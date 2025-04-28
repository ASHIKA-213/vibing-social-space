
import React from 'react';
import ChatSidebar from '@/components/chat/ChatSidebar';
import ChatWindow from '@/components/chat/ChatWindow';

const Messages: React.FC = () => {
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
