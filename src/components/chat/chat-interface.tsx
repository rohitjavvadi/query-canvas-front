
import React, { useRef, useEffect } from 'react';
import ChatMessage from './chat-message';
import ChatInput from './chat-input';
import { Message } from '@/types';
import { ScrollArea } from "@/components/ui/scroll-area";

interface ChatInterfaceProps {
  messages: Message[];
  onSendMessage: (message: string) => void;
  isProcessing: boolean;
}

const ChatInterface: React.FC<ChatInterfaceProps> = ({ 
  messages, 
  onSendMessage,
  isProcessing
}) => {
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight;
    }
  }, [messages]);
  
  const getWelcomeMessage = () => {
    if (messages.length === 0) {
      return (
        <div className="flex flex-col items-center justify-center h-full text-center px-4">
          <div className="mb-4 text-5xl opacity-20">📊</div>
          <h2 className="text-xl font-medium mb-2">Welcome to Conversational Analytics</h2>
          <p className="text-muted-foreground max-w-md mb-4">
            Upload your data files and ask questions about your data in natural language.
          </p>
          <p className="text-sm text-muted-foreground">
            Try: "Show me sales trends for last quarter" or "What's the distribution of customer ages?"
          </p>
        </div>
      );
    }
    return null;
  };
  
  return (
    <div className="flex flex-col h-full">
      {messages.length > 0 ? (
        <ScrollArea ref={scrollAreaRef} className="flex-grow p-4">
          {messages.map((message) => (
            <ChatMessage key={message.id} message={message} />
          ))}
          {isProcessing && (
            <div className="flex items-center gap-2 text-sm text-muted-foreground animate-pulse-gentle">
              <div className="w-2 h-2 rounded-full bg-current"></div>
              <div className="w-2 h-2 rounded-full bg-current"></div>
              <div className="w-2 h-2 rounded-full bg-current"></div>
            </div>
          )}
        </ScrollArea>
      ) : (
        <div className="flex-grow overflow-y-auto">
          {getWelcomeMessage()}
        </div>
      )}
      
      <ChatInput onSendMessage={onSendMessage} isProcessing={isProcessing} />
    </div>
  );
};

export default ChatInterface;
