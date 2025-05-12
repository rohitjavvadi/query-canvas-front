
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartData } from '@/types';
import Icon from '@/components/ui/icon';

interface ChartDisplayProps {
  chartData?: ChartData;
  isLoading: boolean;
}

const ChartDisplay: React.FC<ChartDisplayProps> = ({ chartData, isLoading }) => {
  if (isLoading) {
    return (
      <Card className="w-full h-full flex items-center justify-center bg-card/50">
        <div className="flex flex-col items-center">
          <Icon name="loader" className="animate-spin h-10 w-10 text-muted-foreground mb-4" />
          <p className="text-sm text-muted-foreground">Generating chart...</p>
        </div>
      </Card>
    );
  }
  
  if (!chartData) {
    return (
      <Card className="w-full h-full flex items-center justify-center bg-card/50">
        <div className="flex flex-col items-center text-muted-foreground">
          <Icon name="chart-bar" className="h-10 w-10 mb-4 opacity-50" />
          <p className="text-sm">Ask a question about your data to see visualizations</p>
        </div>
      </Card>
    );
  }
  
  if (chartData.type === 'image' && chartData.imageUrl) {
    return (
      <Card className="w-full h-full">
        <CardHeader className="py-3 px-4">
          <CardTitle className="text-sm">Data Visualization</CardTitle>
        </CardHeader>
        <CardContent className="flex items-center justify-center p-4">
          <img 
            src={chartData.imageUrl} 
            alt="Chart visualization" 
            className="max-w-full max-h-[400px] object-contain" 
          />
        </CardContent>
      </Card>
    );
  }
  
  // For Plotly data (or any other format), we'd render the appropriate visualization
  // For this example, we'll just show a placeholder
  return (
    <Card className="w-full h-full">
      <CardHeader className="py-3 px-4">
        <CardTitle className="text-sm">Data Visualization</CardTitle>
      </CardHeader>
      <CardContent className="p-4">
        <div className="w-full h-[400px] bg-muted/20 rounded-md flex items-center justify-center">
          <p className="text-muted-foreground">Chart would render here with Plotly</p>
        </div>
      </CardContent>
    </Card>
  );
};

export default ChartDisplay;
