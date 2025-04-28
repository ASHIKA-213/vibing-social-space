
import React from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Search, UserPlus, Users } from 'lucide-react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const friendsData = [
  {
    id: '1',
    name: 'Sarah Connor',
    username: 'sarahc',
    avatar: 'https://images.unsplash.com/photo-1649972904349-6e44c42644a7?w=128&h=128&fit=crop&crop=face',
    mutualFriends: 12,
  },
  {
    id: '2',
    name: 'John Doe',
    username: 'johndoe',
    avatar: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=128&h=128&fit=crop&crop=face',
    mutualFriends: 8,
  },
  {
    id: '3',
    name: 'Alex Morgan',
    username: 'alexm',
    avatar: 'https://images.unsplash.com/photo-1721322800607-8c38375eef04?w=128&h=128&fit=crop&crop=face',
    mutualFriends: 5,
  },
];

const suggestedData = [
  {
    id: '4',
    name: 'Jessica Alba',
    username: 'jessicaa',
    avatar: '',
    mutualFriends: 3,
  },
  {
    id: '5',
    name: 'Mike Johnson',
    username: 'mikej',
    avatar: '',
    mutualFriends: 2,
  },
];

const FriendCard: React.FC<{
  friend: typeof friendsData[0];
  buttonText: string;
  buttonVariant?: 'default' | 'outline' | 'ghost';
}> = ({ friend, buttonText, buttonVariant = 'default' }) => {
  return (
    <Card className="overflow-hidden">
      <CardHeader className="p-0">
        <div className="h-24 bg-gradient-to-r from-vibely-100 to-vibely-200"></div>
      </CardHeader>
      <CardContent className="p-6 pt-0">
        <div className="flex flex-col items-center -mt-10">
          <Avatar className="w-20 h-20 border-4 border-white">
            <AvatarImage src={friend.avatar} />
            <AvatarFallback>{friend.name.charAt(0)}</AvatarFallback>
          </Avatar>
          <h3 className="mt-2 font-semibold text-lg">{friend.name}</h3>
          <p className="text-muted-foreground text-sm">@{friend.username}</p>
          {friend.mutualFriends > 0 && (
            <div className="flex items-center mt-2 text-xs text-muted-foreground">
              <Users className="w-3 h-3 mr-1" />
              {friend.mutualFriends} mutual friends
            </div>
          )}
          <Button variant={buttonVariant} className="mt-4 w-full rounded-full">
            {buttonText}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

const Friends: React.FC = () => {
  return (
    <div className="container py-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Friends</h1>
        <div className="relative max-w-xs">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground w-4 h-4" />
          <Input placeholder="Search for friends..." className="pl-9" />
        </div>
      </div>

      <Tabs defaultValue="all">
        <TabsList className="mb-6">
          <TabsTrigger value="all">All Friends</TabsTrigger>
          <TabsTrigger value="suggestions">Suggestions</TabsTrigger>
          <TabsTrigger value="requests">Requests</TabsTrigger>
        </TabsList>
        
        <TabsContent value="all">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {friendsData.map((friend) => (
              <FriendCard 
                key={friend.id} 
                friend={friend} 
                buttonText="Message" 
                buttonVariant="outline"
              />
            ))}
          </div>
        </TabsContent>
        
        <TabsContent value="suggestions">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {suggestedData.map((friend) => (
              <FriendCard 
                key={friend.id} 
                friend={friend} 
                buttonText="Add Friend" 
              />
            ))}
          </div>
        </TabsContent>
        
        <TabsContent value="requests">
          <div className="rounded-md bg-secondary p-8 text-center">
            <p className="text-muted-foreground">No friend requests</p>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Friends;
