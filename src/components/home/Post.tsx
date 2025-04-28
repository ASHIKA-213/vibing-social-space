
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
    <Card className="border bg-white dark:bg-black overflow-hidden">
      <CardHeader className="flex flex-row items-center gap-3 p-3">
        <Avatar className="h-8 w-8">
          <AvatarImage src={author.avatar} alt={author.name} />
          <AvatarFallback>{author.name.charAt(0)}</AvatarFallback>
        </Avatar>
        <div className="flex flex-col">
          <span className="text-sm font-semibold">{author.name}</span>
          <span className="text-xs text-muted-foreground">@{author.username}</span>
        </div>
      </CardHeader>
      {image && (
        <div className="aspect-square relative">
          <img src={image} alt="Post" className="object-cover w-full h-full" />
        </div>
      )}
      <CardContent className="p-3">
        <div className="flex gap-3 mb-2">
          <Button
            variant="ghost"
            size="icon"
            className={`rounded-full p-2 ${liked ? 'text-red-500 hover:text-red-600' : ''}`}
            onClick={handleLike}
          >
            <Heart className={`w-6 h-6 ${liked ? 'fill-current' : ''}`} />
          </Button>
          <Button variant="ghost" size="icon" className="rounded-full p-2">
            <MessageCircle className="w-6 h-6" />
          </Button>
        </div>
        <div className="space-y-1">
          <p className="text-sm font-semibold">{likes} likes</p>
          <div className="text-sm">
            <span className="font-semibold mr-2">{author.username}</span>
            {content}
          </div>
          <p className="text-xs text-muted-foreground">
            {commentCount} comments • {timestamp}
          </p>
        </div>
      </CardContent>
      <CardFooter className="p-3 pt-0">
        <form onSubmit={handleComment} className="flex items-center w-full gap-2">
          <Input
            placeholder="Add a comment..."
            className="flex-1 h-8 bg-transparent border-0 px-0 focus-visible:ring-0"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />
          <Button 
            type="submit" 
            variant="ghost" 
            className="text-primary p-0 h-auto hover:bg-transparent" 
            disabled={!comment.trim()}
          >
            Post
          </Button>
        </form>
      </CardFooter>
    </Card>
  );
};

export default Post;
