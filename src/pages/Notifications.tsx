
import React from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Heart, MessageCircle, User, UserPlus } from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';

interface Notification {
  id: string;
  type: 'like' | 'comment' | 'follow' | 'message';
  user: {
    name: string;
    username: string;
    avatar: string;
  };
  content: string;
  time: string;
  read: boolean;
}

const notifications: Notification[] = [
  {
    id: '1',
    type: 'like',
    user: {
      name: 'Sarah Connor',
      username: 'sarahc',
      avatar: 'https://images.unsplash.com/photo-1649972904349-6e44c42644a7?w=128&h=128&fit=crop&crop=face',
    },
    content: 'liked your post "Just launched our new social platform!"',
    time: '2 minutes ago',
    read: false,
  },
  {
    id: '2',
    type: 'comment',
    user: {
      name: 'John Doe',
      username: 'johndoe',
      avatar: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=128&h=128&fit=crop&crop=face',
    },
    content: 'commented on your post: "This looks amazing! Can\'t wait to try it out."',
    time: '1 hour ago',
    read: false,
  },
  {
    id: '3',
    type: 'follow',
    user: {
      name: 'Alex Morgan',
      username: 'alexm',
      avatar: 'https://images.unsplash.com/photo-1721322800607-8c38375eef04?w=128&h=128&fit=crop&crop=face',
    },
    content: 'started following you',
    time: '3 hours ago',
    read: true,
  },
  {
    id: '4',
    type: 'message',
    user: {
      name: 'Jessica Alba',
      username: 'jessicaa',
      avatar: '',
    },
    content: 'sent you a message: "Hey, how are you doing?"',
    time: '1 day ago',
    read: true,
  },
];

const NotificationIcon: React.FC<{ type: Notification['type'] }> = ({ type }) => {
  switch (type) {
    case 'like':
      return <Heart className="w-4 h-4 text-red-500" />;
    case 'comment':
      return <MessageCircle className="w-4 h-4 text-blue-500" />;
    case 'follow':
      return <UserPlus className="w-4 h-4 text-green-500" />;
    case 'message':
      return <MessageCircle className="w-4 h-4 text-vibely-500" />;
    default:
      return <Heart className="w-4 h-4" />;
  }
};

const NotificationItem: React.FC<{ notification: Notification }> = ({ notification }) => {
  return (
    <div className={`p-4 ${notification.read ? '' : 'bg-secondary'}`}>
      <div className="flex items-start gap-4">
        <Avatar>
          <AvatarImage src={notification.user.avatar} />
          <AvatarFallback>{notification.user.name.charAt(0)}</AvatarFallback>
        </Avatar>
        <div className="flex-1">
          <div className="flex items-center gap-2">
            <p>
              <span className="font-medium">{notification.user.name}</span>{' '}
              <span className="text-muted-foreground">{notification.content}</span>
            </p>
            <NotificationIcon type={notification.type} />
          </div>
          <p className="text-xs text-muted-foreground mt-1">{notification.time}</p>
        </div>
      </div>
    </div>
  );
};

const Notifications: React.FC = () => {
  return (
    <div className="container max-w-2xl py-6">
      <Card>
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Notifications</CardTitle>
              <CardDescription>Stay updated with your network</CardDescription>
            </div>
            <Button variant="ghost" size="sm">
              Mark all as read
            </Button>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <div className="divide-y">
            {notifications.map((notification) => (
              <NotificationItem key={notification.id} notification={notification} />
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Notifications;
