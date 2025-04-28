
import React, { useState } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Heart, MessageCircle, Send } from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import { Input } from '@/components/ui/input';

interface PostProps {
  id: string;
  author: {
    name: string;
    avatar: string;
    username: string;
  };
  content: string;
  image?: string;
  timestamp: string;
  likes: number;
  comments: number;
}

const Post: React.FC<PostProps> = ({
  id,
  author,
  content,
  image,
  timestamp,
  likes: initialLikes,
  comments: commentCount,
}) => {
  const [liked, setLiked] = useState(false);
  const [likes, setLikes] = useState(initialLikes);
  const [comment, setComment] = useState('');

  const handleLike = () => {
    if (liked) {
      setLikes(likes - 1);
    } else {
      setLikes(likes + 1);
    }
    setLiked(!liked);
  };

  const handleComment = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, this would send the comment to the backend
    console.log('New comment:', comment);
    setComment('');
  };

  return (
    <Card className="mb-6 overflow-hidden">
      <CardHeader className="flex flex-row items-center gap-4 p-4">
        <Avatar>
          <AvatarImage src={author.avatar} alt={author.name} />
          <AvatarFallback>{author.name.charAt(0)}</AvatarFallback>
        </Avatar>
        <div className="flex flex-col">
          <span className="font-medium">{author.name}</span>
          <span className="text-xs text-muted-foreground">@{author.username} • {timestamp}</span>
        </div>
      </CardHeader>
      <CardContent className="p-4 pt-0">
        <p className="mb-4">{content}</p>
        {image && (
          <div className="overflow-hidden rounded-md">
            <img src={image} alt="Post" className="object-cover w-full h-full" />
          </div>
        )}
      </CardContent>
      <CardFooter className="flex flex-col p-0">
        <div className="flex items-center justify-between w-full px-4 py-2">
          <div className="flex items-center gap-1">
            <Button
              variant="ghost"
              size="icon"
              className={`rounded-full ${liked ? 'text-red-500 hover:text-red-600' : ''}`}
              onClick={handleLike}
            >
              <Heart className={`w-5 h-5 ${liked ? 'fill-current' : ''}`} />
            </Button>
            <span className="text-sm">{likes}</span>
          </div>
          <div className="flex items-center gap-1">
            <Button variant="ghost" size="icon" className="rounded-full">
              <MessageCircle className="w-5 h-5" />
            </Button>
            <span className="text-sm">{commentCount}</span>
          </div>
        </div>
        <Separator />
        <form onSubmit={handleComment} className="flex items-center w-full gap-2 p-2">
          <Avatar className="w-7 h-7">
            <AvatarImage src={author.avatar} alt={author.name} />
            <AvatarFallback>{author.name.charAt(0)}</AvatarFallback>
          </Avatar>
          <Input
            placeholder="Add a comment..."
            className="flex-1 h-8 bg-gray-100 border-0"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />
          <Button type="submit" size="icon" variant="ghost" className="rounded-full h-8 w-8" disabled={!comment.trim()}>
            <Send className="w-4 h-4" />
          </Button>
        </form>
      </CardFooter>
    </Card>
  );
};

export default Post;
