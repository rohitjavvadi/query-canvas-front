
export interface Message {
  id: string;
  type: 'user' | 'assistant';
  content: string;
  timestamp: string;
}

export interface Session {
  id: string;
  title: string;
  lastUpdated: string;
  messages: Message[];
}

export interface FileUpload {
  id: string;
  name: string;
  type: string;
  size: number;
  uploadTime: string;
}

export interface ChartData {
  type: 'plotly' | 'image';
  data?: Record<string, unknown>;
  imageUrl?: string;
}

// Add icon type for consistent naming
export type IconName = 
  | 'arrow-right'
  | 'arrow-left'
  | 'arrow-up'
  | 'arrow-down'
  | 'menu'
  | 'refresh-cw'
  | 'upload'
  | 'history'
  | 'loader'
  | 'chart-bar'
  | 'message-square'
  | 'loader-circle';
