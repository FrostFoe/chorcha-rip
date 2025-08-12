
'use client';

import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ChevronRight } from 'lucide-react';
import React from 'react';

interface SettingsLinkProps {
  icon: React.ElementType;
  text: string;
  color: string;
  badge?: number;
}

export const SettingsLink: React.FC<SettingsLinkProps> = ({ icon: Icon, text, color, badge }) => {
  return (
    <Button
      variant="ghost"
      className="w-full justify-start items-center gap-4 px-4 py-6 text-base"
    >
      <div
        className={`p-2 rounded-lg flex items-center justify-center ${color}`}
      >
        <Icon className="h-5 w-5 text-white" />
      </div>
      <span className="flex-1 text-left">{text}</span>
      {badge !== undefined && (
        <Badge variant="secondary" className={`${badge > 0 ? 'bg-blue-500/20 text-blue-300' : ''} rounded-full`}>
            {badge}
        </Badge>
      )}
      <ChevronRight className="h-5 w-5 text-muted-foreground" />
    </Button>
  );
};
