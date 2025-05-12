
import React from 'react';
import { Session } from '@/types';
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import Icon from '@/components/ui/icon';
import { cn } from '@/lib/utils';
import { formatDistanceToNow } from 'date-fns';

interface SessionHistoryProps {
  sessions: Session[];
  onSelectSession: (session: Session) => void;
  currentSessionId?: string;
}

const SessionHistory: React.FC<SessionHistoryProps> = ({ 
  sessions, 
  onSelectSession,
  currentSessionId
}) => {
  return (
    <div className="px-4">
      <h2 className="text-sm font-semibold mb-2">Session History</h2>
      <ScrollArea className="h-[calc(100vh-230px)]">
        {sessions.length === 0 ? (
          <div className="text-center py-8 text-muted-foreground">
            <Icon name="history" className="mx-auto mb-2" />
            <p className="text-xs">No sessions yet</p>
          </div>
        ) : (
          <div className="space-y-2 pr-2">
            {sessions.map((session) => (
              <Button
                key={session.id}
                variant="ghost"
                className={cn(
                  "w-full justify-start text-left h-auto py-2 px-3",
                  currentSessionId === session.id && "bg-accent text-accent-foreground"
                )}
                onClick={() => onSelectSession(session)}
              >
                <div className="flex flex-col w-full items-start">
                  <span className="text-sm font-medium truncate w-full">
                    {session.title}
                  </span>
                  <span className="text-xs text-muted-foreground">
                    {formatDistanceToNow(new Date(session.lastUpdated), { addSuffix: true })}
                  </span>
                </div>
              </Button>
            ))}
          </div>
        )}
      </ScrollArea>
    </div>
  );
};

export default SessionHistory;
