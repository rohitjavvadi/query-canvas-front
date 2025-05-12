
import { icons } from 'lucide-react';
import React from 'react';
import { IconName } from '@/types';

interface IconProps {
  name: IconName;
  size?: number;
  className?: string;
}

const Icon = ({ name, size = 20, className = '' }: IconProps) => {
  // Convert kebab-case to PascalCase for Lucide icon names
  const formattedName = name.split('-')
    .map(part => part.charAt(0).toUpperCase() + part.slice(1))
    .join('');
  
  const LucideIcon = icons[formattedName as keyof typeof icons];
  
  if (!LucideIcon) {
    console.error(`Icon "${name}" not found. Using fallback.`);
    return <div className={`w-${size} h-${size} ${className}`} />;
  }
  
  return <LucideIcon size={size} className={className} />;
};

export default Icon;
