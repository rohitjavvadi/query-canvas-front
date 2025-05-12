
import React from 'react';
import { Button } from "@/components/ui/button";
import { Session, FileUpload } from '@/types';
import FileUploadComponent from './file-upload';
import SessionHistory from './session-history';
import Icon from '@/components/ui/icon';
import { cn } from '@/lib/utils';
import { useIsMobile } from '@/hooks/use-mobile';

interface SidebarProps {
  sessions: Session[];
  onSelectSession: (session: Session) => void;
  onContinueLastSession: () => void;
  onFileUploaded: (file: FileUpload) => void;
  currentSessionId?: string;
  isCollapsed: boolean;
  onToggleSidebar: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({
  sessions,
  onSelectSession,
  onContinueLastSession,
  onFileUploaded,
  currentSessionId,
  isCollapsed,
  onToggleSidebar
}) => {
  const isMobile = useIsMobile();
  const hasExistingSession = sessions.length > 0;

  return (
    <div 
      className={cn(
        "h-screen bg-background border-r border-border transition-all duration-300 flex flex-col",
        isCollapsed ? "w-0 overflow-hidden" : "w-64"
      )}
    >
      <div className="flex items-center justify-between p-4 border-b border-border">
        <h1 className={cn("text-lg font-semibold", isCollapsed && "hidden")}>Analytics</h1>
        {!isCollapsed && isMobile && (
          <Button size="icon" variant="ghost" onClick={onToggleSidebar}>
            <Icon name="menu" />
          </Button>
        )}
      </div>
      
      {!isCollapsed && (
        <>
          <div className="p-4">
            <Button 
              className="w-full mb-4" 
              disabled={!hasExistingSession}
              onClick={onContinueLastSession}
            >
              <Icon name="refresh-cw" className="mr-2" />
              Continue Last Session
            </Button>
          </div>
          
          <FileUploadComponent onFileUploaded={onFileUploaded} />
          
          <SessionHistory 
            sessions={sessions} 
            onSelectSession={onSelectSession} 
            currentSessionId={currentSessionId}
          />
        </>
      )}
    </div>
  );
};

export default Sidebar;
