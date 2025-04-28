
import { useEffect, useState } from 'react';

// Define the types of events we'll handle
export type WebSocketEventType = 'message' | 'friend_request' | 'notification' | 'typing';

// Message event structure
export interface WebSocketMessageEvent {
  type: 'message';
  data: {
    id: string;
    content: string;
    sender: 'user' | 'other';
    timestamp: string;
  };
}

// Friend event structure
export interface WebSocketFriendEvent {
  type: 'friend_request';
  data: {
    id: string;
    name: string;
    username: string;
    avatar: string;
    action: 'request' | 'accept' | 'decline';
  };
}

// Notification event structure
export interface WebSocketNotificationEvent {
  type: 'notification';
  data: {
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
  };
}

// Typing indicator event
export interface WebSocketTypingEvent {
  type: 'typing';
  data: {
    userId: string;
    conversationId: string;
    isTyping: boolean;
  };
}

// Union type for all WebSocket events
export type WebSocketEvent = 
  | WebSocketMessageEvent 
  | WebSocketFriendEvent 
  | WebSocketNotificationEvent
  | WebSocketTypingEvent;

// Mock WebSocket implementation for demo purposes
class MockWebSocket {
  private listeners: Record<string, ((event: any) => void)[]> = {};
  private static instance: MockWebSocket;
  
  public static getInstance(): MockWebSocket {
    if (!MockWebSocket.instance) {
      MockWebSocket.instance = new MockWebSocket();
    }
    return MockWebSocket.instance;
  }
  
  public addEventListener(event: string, callback: (event: any) => void): void {
    if (!this.listeners[event]) {
      this.listeners[event] = [];
    }
    this.listeners[event].push(callback);
  }
  
  public removeEventListener(event: string, callback: (event: any) => void): void {
    if (this.listeners[event]) {
      this.listeners[event] = this.listeners[event].filter(cb => cb !== callback);
    }
  }
  
  public send(data: any): void {
    // In a real implementation, this would send data to the server
    console.log('WebSocket sent:', data);
    
    // Mock response for demo purposes
    setTimeout(() => {
      this.simulateReceive(data);
    }, 500);
  }
  
  private simulateReceive(data: any): void {
    // Parse the sent data and simulate a response
    const parsed = typeof data === 'string' ? JSON.parse(data) : data;
    
    // Create a response based on the type of message
    let response: WebSocketEvent | null = null;
    
    switch(parsed.type) {
      case 'message':
        // Echo the message back as if from another user
        response = {
          type: 'message',
          data: {
            id: Date.now().toString(),
            content: `Reply to: "${parsed.data.content}"`,
            sender: 'other',
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          }
        };
        break;
      case 'friend_request':
        // Simulate friend request acceptance
        response = {
          type: 'friend_request',
          data: {
            id: parsed.data.id,
            name: parsed.data.name,
            username: parsed.data.username,
            avatar: parsed.data.avatar,
            action: 'accept'
          }
        };
        break;
      case 'notification':
        // Echo the notification
        response = parsed;
        break;
    }
    
    // Dispatch the event to listeners
    if (response && this.listeners['message']) {
      const event = { data: JSON.stringify(response) };
      this.listeners['message'].forEach(callback => callback(event));
    }
  }
  
  public close(): void {
    // Clean up
    this.listeners = {};
  }
}

// Hook for using WebSocket in components
export const useWebSocket = () => {
  const [socket, setSocket] = useState<MockWebSocket | null>(null);
  const [connected, setConnected] = useState(false);
  const [events, setEvents] = useState<WebSocketEvent[]>([]);
  
  useEffect(() => {
    // Initialize WebSocket
    const ws = MockWebSocket.getInstance();
    setSocket(ws);
    setConnected(true);
    
    const handleMessage = (event: MessageEvent) => {
      try {
        const data = JSON.parse(event.data);
        setEvents(prev => [...prev, data]);
      } catch (error) {
        console.error('Error parsing WebSocket message:', error);
      }
    };
    
    // Add event listener for incoming messages
    ws.addEventListener('message', handleMessage);
    
    // Clean up
    return () => {
      ws.removeEventListener('message', handleMessage);
    };
  }, []);
  
  // Function to send messages through WebSocket
  const sendEvent = (event: Omit<WebSocketEvent, 'id'>) => {
    if (socket && connected) {
      socket.send(JSON.stringify(event));
    } else {
      console.error('WebSocket not connected');
    }
  };
  
  // Filter events by type
  const getEventsByType = <T extends WebSocketEvent>(type: WebSocketEventType): T[] => {
    return events.filter(event => event.type === type) as T[];
  };
  
  return {
    connected,
    sendEvent,
    events,
    getEventsByType,
  };
};
