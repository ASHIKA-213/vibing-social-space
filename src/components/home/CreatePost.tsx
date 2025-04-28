
import React, { useState } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Camera, Image, Send } from 'lucide-react';

const CreatePost: React.FC = () => {
  const [content, setContent] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!content.trim()) return;
    
    // Simulate posting
    setIsLoading(true);
    setTimeout(() => {
      console.log('Post content:', content);
      setContent('');
      setIsLoading(false);
    }, 1000);
  };

  return (
    <Card className="mb-6">
      <form onSubmit={handleSubmit}>
        <CardContent className="p-4">
          <div className="flex gap-3">
            <Avatar>
              <AvatarImage src="https://images.unsplash.com/photo-1649972904349-6e44c42644a7?w=128&h=128&fit=crop&crop=face" alt="User" />
              <AvatarFallback>UN</AvatarFallback>
            </Avatar>
            <Textarea
              placeholder="What's happening?"
              className="flex-1 border-0 focus-visible:ring-0 resize-none"
              value={content}
              onChange={(e) => setContent(e.target.value)}
            />
          </div>
        </CardContent>
        <CardFooter className="flex justify-between p-4 pt-0">
          <div className="flex gap-2">
            <Button type="button" size="icon" variant="ghost" className="text-muted-foreground rounded-full">
              <Image className="w-5 h-5" />
            </Button>
            <Button type="button" size="icon" variant="ghost" className="text-muted-foreground rounded-full">
              <Camera className="w-5 h-5" />
            </Button>
          </div>
          <Button 
            type="submit" 
            className="rounded-full px-4"
            disabled={!content.trim() || isLoading}
          >
            {isLoading ? 'Posting...' : 'Post'}
            {!isLoading && <Send className="ml-2 w-4 h-4" />}
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
};

export default CreatePost;
