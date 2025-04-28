
import React from 'react';
import Post from './Post';

// Sample data for posts
const posts = [
  {
    id: '1',
    author: {
      name: 'Sarah Connor',
      username: 'sarahc',
      avatar: 'https://images.unsplash.com/photo-1649972904349-6e44c42644a7?w=128&h=128&fit=crop&crop=face',
    },
    content: 'Just launched our new social platform! So excited to see where this goes. #vibely #socialmedia #launch',
    image: 'https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?w=800&auto=format&fit=crop',
    timestamp: '2h ago',
    likes: 24,
    comments: 5,
  },
  {
    id: '2',
    author: {
      name: 'John Doe',
      username: 'johndoe',
      avatar: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=128&h=128&fit=crop&crop=face',
    },
    content: 'Working on the real-time chat feature today. WebSockets are amazing for building responsive chat applications!',
    timestamp: '5h ago',
    likes: 18,
    comments: 3,
  },
  {
    id: '3',
    author: {
      name: 'Alex Morgan',
      username: 'alexm',
      avatar: 'https://images.unsplash.com/photo-1721322800607-8c38375eef04?w=128&h=128&fit=crop&crop=face',
    },
    content: 'Just finished the user profile page design. What do you think of this color palette?',
    image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=800&auto=format&fit=crop',
    timestamp: '1d ago',
    likes: 42,
    comments: 7,
  },
];

const PostList: React.FC = () => {
  return (
    <div className="space-y-4">
      {posts.map((post) => (
        <Post key={post.id} {...post} />
      ))}
    </div>
  );
};

export default PostList;
