
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import Icon from '@/components/ui/icon';

interface ChatInputProps {
  onSendMessage: (message: string) => void;
  isProcessing: boolean;
}

const ChatInput: React.FC<ChatInputProps> = ({ onSendMessage, isProcessing }) => {
  const [message, setMessage] = useState('');
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim() && !isProcessing) {
      onSendMessage(message);
      setMessage('');
    }
  };
  
  return (
    <form onSubmit={handleSubmit} className="border-t border-border p-4">
      <div className="flex gap-2">
        <div className="relative flex-grow">
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="w-full px-4 py-2 rounded-full border border-input bg-background focus:outline-none focus:ring-1 focus:ring-primary"
            placeholder="Ask about your data..."
            disabled={isProcessing}
          />
        </div>
        <Button 
          type="submit" 
          size="icon"
          disabled={!message.trim() || isProcessing}
          className="rounded-full"
        >
          {isProcessing ? (
            <Icon name="loader" className="animate-spin" />
          ) : (
            <Icon name="arrow-right" />
          )}
        </Button>
      </div>
    </form>
  );
};

export default ChatInput;
