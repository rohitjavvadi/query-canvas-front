
import { icons } from 'lucide-react';
import React from 'react';

interface IconProps {
  name: keyof typeof icons;
  size?: number;
  className?: string;
}

const Icon = ({ name, size = 20, className = '' }: IconProps) => {
  const LucideIcon = icons[name];
  return <LucideIcon size={size} className={className} />;
};

export default Icon;
