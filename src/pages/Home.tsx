
import React from 'react';
import CreatePost from '@/components/home/CreatePost';
import PostList from '@/components/home/PostList';

const Home: React.FC = () => {
  return (
    <div className="container max-w-2xl py-6">
      <CreatePost />
      <PostList />
    </div>
  );
};

export default Home;
