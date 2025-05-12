
import React, { useState, useEffect } from 'react';
import Sidebar from '../components/sidebar/sidebar';
import ChatInterface from '../components/chat/chat-interface';
import ChartDisplay from '../components/chart/chart-display';
import { Session, Message, FileUpload, ChartData } from '../types';
import { toast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import Icon from '@/components/ui/icon';
import { useIsMobile } from '@/hooks/use-mobile';

// Mock data generator functions
const generateMockSessions = (): Session[] => {
  return Array.from({ length: 3 }).map((_, index) => ({
    id: `session-${index + 1}`,
    title: `Analysis Session ${index + 1}`,
    lastUpdated: new Date(Date.now() - index * 86400000).toISOString(),
    messages: []
  }));
};

// Sample chart image - replace with actual chart generation in a real app
const sampleChartUrl = "https://miro.medium.com/v2/resize:fit:1400/1*-hxsWI1TgN2ryYC2PQL7HQ.png";

// Main component
const Index: React.FC = () => {
  const isMobile = useIsMobile();
  const [isLoading, setIsLoading] = useState(true);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(isMobile);
  const [sessions, setSessions] = useState<Session[]>([]);
  const [currentSession, setCurrentSession] = useState<Session | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [chartData, setChartData] = useState<ChartData | undefined>(undefined);
  const [isChartLoading, setIsChartLoading] = useState(false);
  
  // Initialize with mock data
  useEffect(() => {
    // Simulate loading data
    setTimeout(() => {
      const mockSessions = generateMockSessions();
      setSessions(mockSessions);
      setIsLoading(false);
    }, 1000);
  }, []);
  
  // Effect to update mobile sidebar state
  useEffect(() => {
    setIsSidebarCollapsed(isMobile);
  }, [isMobile]);
  
  // Handle session selection
  const handleSelectSession = (session: Session) => {
    setCurrentSession(session);
    setMessages(session.messages);
    setChartData(undefined);
    
    if (isMobile) {
      setIsSidebarCollapsed(true);
    }
    
    toast({
      title: "Session loaded",
      description: `Loaded session: ${session.title}`
    });
  };
  
  // Handle continuing last session
  const handleContinueLastSession = () => {
    if (sessions.length > 0) {
      // Sort by most recent and get the first one
      const lastSession = [...sessions].sort(
        (a, b) => new Date(b.lastUpdated).getTime() - new Date(a.lastUpdated).getTime()
      )[0];
      
      handleSelectSession(lastSession);
    }
  };
  
  // Handle file upload
  const handleFileUploaded = (file: FileUpload) => {
    // Create a new session when a file is uploaded
    const newSession: Session = {
      id: `session-${Date.now()}`,
      title: `Analysis of ${file.name}`,
      lastUpdated: new Date().toISOString(),
      messages: []
    };
    
    setSessions([newSession, ...sessions]);
    setCurrentSession(newSession);
    setMessages([]);
    setChartData(undefined);
  };
  
  // Handle sending a message
  const handleSendMessage = async (content: string) => {
    if (!currentSession && sessions.length === 0) {
      // Create a new session if none exists
      const newSession: Session = {
        id: `session-${Date.now()}`,
        title: `New Analysis`,
        lastUpdated: new Date().toISOString(),
        messages: []
      };
      
      setSessions([newSession, ...sessions]);
      setCurrentSession(newSession);
    }
    
    const userMessage: Message = {
      id: `msg-${Date.now()}`,
      type: 'user',
      content,
      timestamp: new Date().toISOString()
    };
    
    setMessages(prevMessages => [...prevMessages, userMessage]);
    setIsProcessing(true);
    
    // Simulate API call for chart generation
    setIsChartLoading(true);
    
    try {
      // Simulate processing time
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Create mock assistant response
      const assistantMessage: Message = {
        id: `msg-${Date.now() + 1}`,
        type: 'assistant',
        content: `Here's an analysis based on your query: "${content}"`,
        timestamp: new Date().toISOString()
      };
      
      setMessages(prevMessages => [...prevMessages, assistantMessage]);
      
      // Generate mock chart data
      setChartData({
        type: 'image',
        imageUrl: sampleChartUrl
      });
      
      // Update current session with new messages
      if (currentSession) {
        const updatedSession = {
          ...currentSession,
          messages: [...messages, userMessage, assistantMessage],
          lastUpdated: new Date().toISOString()
        };
        
        setCurrentSession(updatedSession);
        
        // Update session in the sessions list
        setSessions(prevSessions => 
          prevSessions.map(s => s.id === updatedSession.id ? updatedSession : s)
        );
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to process your query. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsProcessing(false);
      setIsChartLoading(false);
    }
  };
  
  const toggleSidebar = () => {
    setIsSidebarCollapsed(!isSidebarCollapsed);
  };

  if (isLoading) {
    return (
      <div className="h-screen flex items-center justify-center">
        <div className="flex flex-col items-center">
          <Icon name="loader" className="animate-spin h-8 w-8 text-primary mb-4" />
          <p className="text-muted-foreground">Loading your analytics workspace...</p>
        </div>
      </div>
    );
  }
  
  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar
        sessions={sessions}
        onSelectSession={handleSelectSession}
        onContinueLastSession={handleContinueLastSession}
        onFileUploaded={handleFileUploaded}
        currentSessionId={currentSession?.id}
        isCollapsed={isSidebarCollapsed}
        onToggleSidebar={toggleSidebar}
      />
      
      <div className="flex-1 flex flex-col h-screen overflow-hidden">
        <header className="border-b border-border h-14 flex items-center px-4 justify-between">
          <div className="flex items-center">
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={toggleSidebar}
              className="mr-2"
            >
              <Icon name="menu" />
            </Button>
            <h1 className="text-lg font-medium">
              {currentSession ? currentSession.title : 'Conversational Analytics'}
            </h1>
          </div>
        </header>
        
        <div className="flex-1 flex flex-col md:flex-row overflow-hidden">
          <div className="flex-1 md:w-1/2 flex flex-col overflow-hidden border-b md:border-b-0 md:border-r border-border">
            <ChatInterface 
              messages={messages} 
              onSendMessage={handleSendMessage} 
              isProcessing={isProcessing} 
            />
          </div>
          
          <div className="flex-1 md:w-1/2 p-4 overflow-auto">
            <ChartDisplay chartData={chartData} isLoading={isChartLoading} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
