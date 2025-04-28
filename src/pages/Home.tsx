
import React, { useEffect } from 'react';
import CreatePost from '@/components/home/CreatePost';
import PostList from '@/components/home/PostList';
import { useWebSocket } from '@/services/websocketService';
import { useToast } from '@/hooks/use-toast';

const Home: React.FC = () => {
  const { connected } = useWebSocket();
  const { toast } = useToast();
  
  useEffect(() => {
    if (connected) {
      toast({
        title: "Connected",
        description: "Real-time updates enabled for your feed",
      });
    }
  }, [connected, toast]);
  
  return (
    <div className="container max-w-[470px] py-6">
      <div className="space-y-6">
        <CreatePost />
        <PostList />
      </div>
    </div>
  );
};

export default Home;
