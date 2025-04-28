
import React from 'react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import PostList from '@/components/home/PostList';

const Profile: React.FC = () => {
  return (
    <div className="container max-w-4xl py-6">
      <div className="rounded-lg overflow-hidden bg-white shadow">
        <div className="h-48 bg-gradient-to-r from-vibely-600 to-vibely-400"></div>
        <div className="p-6 relative">
          <Avatar className="absolute -top-16 border-4 border-white w-32 h-32">
            <AvatarImage src="https://images.unsplash.com/photo-1649972904349-6e44c42644a7?w=128&h=128&fit=crop&crop=face" alt="User" />
            <AvatarFallback>SC</AvatarFallback>
          </Avatar>
          <div className="mt-16 flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-bold">Sarah Connor</h1>
              <p className="text-muted-foreground">@sarahc</p>
            </div>
            <Button>Edit Profile</Button>
          </div>
          <p className="mt-4">
            Full-stack developer passionate about building social experiences. Working on Vibely to connect people through technology.
          </p>
          <div className="flex gap-4 mt-4">
            <div>
              <span className="font-bold">254</span> <span className="text-muted-foreground">Following</span>
            </div>
            <div>
              <span className="font-bold">1.2k</span> <span className="text-muted-foreground">Followers</span>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-6">
        <Tabs defaultValue="posts">
          <TabsList className="grid grid-cols-3 mb-6">
            <TabsTrigger value="posts">Posts</TabsTrigger>
            <TabsTrigger value="media">Media</TabsTrigger>
            <TabsTrigger value="likes">Likes</TabsTrigger>
          </TabsList>
          <TabsContent value="posts">
            <PostList />
          </TabsContent>
          <TabsContent value="media">
            <div className="grid grid-cols-3 gap-2">
              {[1, 2, 3, 4, 5, 6].map((item) => (
                <div key={item} className="aspect-square bg-secondary rounded-md animate-pulse-light"></div>
              ))}
            </div>
          </TabsContent>
          <TabsContent value="likes">
            <div className="rounded-md bg-secondary p-8 text-center">
              <p className="text-muted-foreground">No liked posts yet</p>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Profile;
