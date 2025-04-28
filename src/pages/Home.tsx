
import React from 'react';
import CreatePost from '@/components/home/CreatePost';
import PostList from '@/components/home/PostList';

const Home: React.FC = () => {
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
