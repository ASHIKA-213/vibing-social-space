
import React, { useState, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Search, UserPlus, Users } from 'lucide-react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useWebSocket, WebSocketFriendEvent } from '@/services/websocketService';
import { useToast } from '@/hooks/use-toast';

interface Friend {
  id: string;
  name: string;
  username: string;
  avatar: string;
  mutualFriends: number;
  status?: 'pending' | 'accepted' | 'none';
}

const initialFriendsData: Friend[] = [
  {
    id: '1',
    name: 'Sarah Connor',
    username: 'sarahc',
    avatar: 'https://images.unsplash.com/photo-1649972904349-6e44c42644a7?w=128&h=128&fit=crop&crop=face',
    mutualFriends: 12,
    status: 'accepted',
  },
  {
    id: '2',
    name: 'John Doe',
    username: 'johndoe',
    avatar: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=128&h=128&fit=crop&crop=face',
    mutualFriends: 8,
    status: 'accepted',
  },
  {
    id: '3',
    name: 'Alex Morgan',
    username: 'alexm',
    avatar: 'https://images.unsplash.com/photo-1721322800607-8c38375eef04?w=128&h=128&fit=crop&crop=face',
    mutualFriends: 5,
    status: 'accepted',
  },
];

const initialSuggestedData: Friend[] = [
  {
    id: '4',
    name: 'Jessica Alba',
    username: 'jessicaa',
    avatar: '',
    mutualFriends: 3,
    status: 'none',
  },
  {
    id: '5',
    name: 'Mike Johnson',
    username: 'mikej',
    avatar: '',
    mutualFriends: 2,
    status: 'none',
  },
];

const FriendCard: React.FC<{
  friend: Friend;
  buttonText: string;
  buttonVariant?: 'default' | 'outline' | 'ghost';
  onButtonClick?: () => void;
}> = ({ friend, buttonText, buttonVariant = 'default', onButtonClick }) => {
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
          <Button 
            variant={buttonVariant} 
            className="mt-4 w-full rounded-full"
            onClick={onButtonClick}
          >
            {buttonText}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

const Friends: React.FC = () => {
  const [friends, setFriends] = useState<Friend[]>(initialFriendsData);
  const [suggestions, setSuggestions] = useState<Friend[]>(initialSuggestedData);
  const [requests, setRequests] = useState<Friend[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const { connected, sendEvent, getEventsByType } = useWebSocket();
  const { toast } = useToast();

  // Handle real-time friend requests and updates
  useEffect(() => {
    const friendEvents = getEventsByType<WebSocketFriendEvent>('friend_request');
    
    if (friendEvents.length > 0) {
      friendEvents.forEach(event => {
        const { data } = event;
        
        switch (data.action) {
          case 'request':
            // Add to friend requests
            setRequests(prev => {
              // Check if request already exists
              if (prev.some(req => req.id === data.id)) return prev;
              
              // Add new request
              const newRequest: Friend = {
                id: data.id,
                name: data.name,
                username: data.username,
                avatar: data.avatar,
                mutualFriends: Math.floor(Math.random() * 5),
                status: 'pending',
              };
              
              // Show toast notification
              toast({
                title: "New Friend Request",
                description: `${data.name} sent you a friend request`,
              });
              
              return [...prev, newRequest];
            });
            break;
            
          case 'accept':
            // Move from suggestions or requests to friends
            setSuggestions(prev => prev.filter(sugg => sugg.id !== data.id));
            setRequests(prev => prev.filter(req => req.id !== data.id));
            
            setFriends(prev => {
              // Check if friend already exists
              if (prev.some(friend => friend.id === data.id)) {
                return prev.map(friend => 
                  friend.id === data.id 
                    ? { ...friend, status: 'accepted' } 
                    : friend
                );
              } else {
                // Add new friend
                const newFriend: Friend = {
                  id: data.id,
                  name: data.name,
                  username: data.username,
                  avatar: data.avatar,
                  mutualFriends: Math.floor(Math.random() * 5) + 3,
                  status: 'accepted',
                };
                
                // Show toast notification
                toast({
                  title: "Friend Request Accepted",
                  description: `You and ${data.name} are now friends!`,
                });
                
                return [...prev, newFriend];
              }
            });
            break;
            
          case 'decline':
            // Remove from requests
            setRequests(prev => prev.filter(req => req.id !== data.id));
            break;
        }
      });
    }
  }, [getEventsByType, toast]);

  // Handle adding a friend
  const handleAddFriend = (friend: Friend) => {
    // Update UI optimistically
    setSuggestions(prev => prev.filter(sugg => sugg.id !== friend.id));
    
    setFriends(prev => [...prev, { ...friend, status: 'accepted' }]);
    
    // Send friend request event
    sendEvent({
      type: 'friend_request',
      data: {
        id: friend.id,
        name: friend.name,
        username: friend.username,
        avatar: friend.avatar,
        action: 'request'
      }
    });
    
    toast({
      title: "Friend Added",
      description: `You are now friends with ${friend.name}`,
    });
  };

  // Handle accepting a friend request
  const handleAcceptRequest = (friend: Friend) => {
    // Update UI
    setRequests(prev => prev.filter(req => req.id !== friend.id));
    setFriends(prev => [...prev, { ...friend, status: 'accepted' }]);
    
    // Send accept event
    sendEvent({
      type: 'friend_request',
      data: {
        id: friend.id,
        name: friend.name,
        username: friend.username,
        avatar: friend.avatar,
        action: 'accept'
      }
    });
    
    toast({
      title: "Request Accepted",
      description: `You are now friends with ${friend.name}`,
    });
  };

  // Handle rejecting a friend request
  const handleRejectRequest = (friend: Friend) => {
    // Update UI
    setRequests(prev => prev.filter(req => req.id !== friend.id));
    
    // Send decline event
    sendEvent({
      type: 'friend_request',
      data: {
        id: friend.id,
        name: friend.name,
        username: friend.username,
        avatar: friend.avatar,
        action: 'decline'
      }
    });
  };

  // Simulate friend request periodically
  useEffect(() => {
    if (!connected) return;
    
    const newFriends = [
      {
        id: '6',
        name: 'Emma Watson',
        username: 'emmaw',
        avatar: '',
        mutualFriends: 4,
      },
      {
        id: '7',
        name: 'Tom Hardy',
        username: 'tomh',
        avatar: '',
        mutualFriends: 2,
      }
    ];
    
    const timer = setInterval(() => {
      // 1 in 10 chance of new friend request
      if (Math.random() < 0.1) {
        const friendIndex = Math.floor(Math.random() * newFriends.length);
        const newFriend = newFriends[friendIndex];
        
        // Send friend request event if not already in any list
        if (
          !friends.some(f => f.id === newFriend.id) &&
          !requests.some(r => r.id === newFriend.id) &&
          !suggestions.some(s => s.id === newFriend.id)
        ) {
          sendEvent({
            type: 'friend_request',
            data: {
              id: newFriend.id,
              name: newFriend.name,
              username: newFriend.username,
              avatar: newFriend.avatar,
              action: 'request'
            }
          });
        }
      }
    }, 20000); // Every 20 seconds
    
    return () => clearInterval(timer);
  }, [connected, friends, requests, suggestions, sendEvent]);

  // Filter friends based on search query
  const filteredFriends = searchQuery 
    ? friends.filter(friend => 
        friend.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        friend.username.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : friends;

  const filteredSuggestions = searchQuery
    ? suggestions.filter(friend => 
        friend.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        friend.username.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : suggestions;

  return (
    <div className="container py-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">
          Friends
          {connected ? '' : ' (offline)'}
        </h1>
        <div className="relative max-w-xs">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground w-4 h-4" />
          <Input 
            placeholder="Search for friends..." 
            className="pl-9" 
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      <Tabs defaultValue="all">
        <TabsList className="mb-6">
          <TabsTrigger value="all">All Friends</TabsTrigger>
          <TabsTrigger value="suggestions">Suggestions</TabsTrigger>
          <TabsTrigger value="requests">
            Requests
            {requests.length > 0 && (
              <span className="ml-1.5 bg-primary text-primary-foreground text-xs rounded-full px-2 py-0.5">
                {requests.length}
              </span>
            )}
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="all">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredFriends.length > 0 ? (
              filteredFriends.map((friend) => (
                <FriendCard 
                  key={friend.id} 
                  friend={friend} 
                  buttonText="Message" 
                  buttonVariant="outline"
                />
              ))
            ) : (
              <div className="col-span-full rounded-md bg-secondary p-8 text-center">
                <p className="text-muted-foreground">No friends found</p>
              </div>
            )}
          </div>
        </TabsContent>
        
        <TabsContent value="suggestions">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredSuggestions.length > 0 ? (
              filteredSuggestions.map((friend) => (
                <FriendCard 
                  key={friend.id} 
                  friend={friend} 
                  buttonText="Add Friend" 
                  onButtonClick={() => handleAddFriend(friend)}
                />
              ))
            ) : (
              <div className="col-span-full rounded-md bg-secondary p-8 text-center">
                <p className="text-muted-foreground">No suggestions available</p>
              </div>
            )}
          </div>
        </TabsContent>
        
        <TabsContent value="requests">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {requests.length > 0 ? (
              requests.map((request) => (
                <Card key={request.id} className="overflow-hidden">
                  <CardHeader className="p-0">
                    <div className="h-24 bg-gradient-to-r from-vibely-100 to-vibely-200"></div>
                  </CardHeader>
                  <CardContent className="p-6 pt-0">
                    <div className="flex flex-col items-center -mt-10">
                      <Avatar className="w-20 h-20 border-4 border-white">
                        <AvatarImage src={request.avatar} />
                        <AvatarFallback>{request.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <h3 className="mt-2 font-semibold text-lg">{request.name}</h3>
                      <p className="text-muted-foreground text-sm">@{request.username}</p>
                      {request.mutualFriends > 0 && (
                        <div className="flex items-center mt-2 text-xs text-muted-foreground">
                          <Users className="w-3 h-3 mr-1" />
                          {request.mutualFriends} mutual friends
                        </div>
                      )}
                      <div className="flex mt-4 gap-2 w-full">
                        <Button 
                          variant="default" 
                          className="flex-1"
                          onClick={() => handleAcceptRequest(request)}
                        >
                          Accept
                        </Button>
                        <Button 
                          variant="outline" 
                          className="flex-1"
                          onClick={() => handleRejectRequest(request)}
                        >
                          Decline
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))
            ) : (
              <div className="col-span-full rounded-md bg-secondary p-8 text-center">
                <p className="text-muted-foreground">No friend requests</p>
              </div>
            )}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Friends;
