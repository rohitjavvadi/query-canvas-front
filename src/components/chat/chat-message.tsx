
import React from 'react';
import { Message } from '@/types';
import { cn } from '@/lib/utils';
import Icon from '@/components/ui/icon';

interface ChatMessageProps {
  message: Message;
}

const ChatMessage: React.FC<ChatMessageProps> = ({ message }) => {
  const isUser = message.type === 'user';
  
  return (
    <div className={cn(
      "flex items-start gap-2 mb-4",
      isUser ? "flex-row" : "flex-row"
    )}>
      <div className={cn(
        "w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0",
        isUser ? "bg-primary text-primary-foreground" : "bg-secondary text-secondary-foreground"
      )}>
        <Icon name={isUser ? "message-square" : "chart-bar"} size={16} />
      </div>
      
      <div className={cn(
        "rounded-lg px-4 py-3 max-w-[85%]",
        isUser ? "bg-primary text-primary-foreground" : "bg-card border border-border shadow-soft"
      )}>
        <p className="text-sm whitespace-pre-wrap">{message.content}</p>
      </div>
    </div>
  );
};

export default ChatMessage;
