
import React, { useRef, useState } from 'react';
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";
import Icon from '@/components/ui/icon';
import { FileUpload } from '@/types';

interface FileUploadProps {
  onFileUploaded: (file: FileUpload) => void;
}

const FileUploadComponent: React.FC<FileUploadProps> = ({ onFileUploaded }) => {
  const [isDragging, setIsDragging] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  const handleFileSelect = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      handleFile(e.target.files[0]);
    }
  };

  const handleFile = async (file: File) => {
    const validTypes = ['text/csv', 'application/vnd.ms-excel', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'];
    
    if (!validTypes.includes(file.type)) {
      toast({
        title: "Invalid file type",
        description: "Please upload a CSV or Excel file.",
        variant: "destructive"
      });
      return;
    }

    setIsUploading(true);
    
    // Simulate file upload
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const newFile: FileUpload = {
        id: Date.now().toString(),
        name: file.name,
        type: file.type,
        size: file.size,
        uploadTime: new Date().toISOString()
      };
      
      onFileUploaded(newFile);
      
      toast({
        title: "File uploaded",
        description: `Successfully uploaded ${file.name}`,
      });
    } catch (error) {
      toast({
        title: "Upload failed",
        description: "There was an error uploading your file.",
        variant: "destructive"
      });
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="mb-6 px-4">
      <h2 className="text-sm font-semibold mb-2">Upload Data</h2>
      <div 
        className={`border-2 border-dashed rounded-lg p-4 text-center cursor-pointer transition-colors ${
          isDragging ? 'border-primary bg-primary/5' : 'border-border hover:border-primary/50'
        }`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={handleFileSelect}
      >
        <input 
          type="file" 
          className="hidden" 
          ref={fileInputRef} 
          onChange={handleFileChange}
          accept=".csv,.xls,.xlsx"
        />
        <Icon name="upload" className="mx-auto mb-2 text-muted-foreground" />
        <p className="text-xs text-muted-foreground mb-1">
          {isUploading ? "Uploading..." : "Drag & drop or click to upload"}
        </p>
        <p className="text-xs text-muted-foreground">CSV or Excel files</p>
      </div>
      
      <Button
        variant="outline"
        size="sm"
        className="w-full mt-2"
        disabled={isUploading}
        onClick={handleFileSelect}
      >
        {isUploading ? (
          <><Icon name="loader" className="mr-2 animate-spin" /> Uploading...</>
        ) : (
          <><Icon name="upload" className="mr-2" /> Upload File</>
        )}
      </Button>
    </div>
  );
};

export default FileUploadComponent;
