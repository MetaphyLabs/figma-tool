import { ICONS } from '@/components/global/icons';
import { TabsTrigger } from '@/components/ui/tabs';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { Component } from 'lucide-react';
import React from 'react';

const TABS = [
  {
    name: 'Figma design upload',
    icon: ICONS.figma,
    value: 'figma-design-upload',
    tooltip: 'Figma Design',
  },
  {
    name: 'App design',
    icon: Component,
    value: 'app-design',
    tooltip: 'App Design',
  },
];

export function AppUpload() {
  return (
    <React.Fragment>
      {TABS.map((tab) => (
        <TooltipProvider key={tab.value}>
          <Tooltip>
            <TabsTrigger value={tab.value} className='px-4 py-2' asChild>
              <TooltipTrigger>
                <span className='sr-only'>{tab.name}</span>
                <tab.icon className='size-5' />
              </TooltipTrigger>
            </TabsTrigger>
            <TooltipContent sideOffset={10}>
              <p>{tab.tooltip}</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      ))}
    </React.Fragment>
  );
}
