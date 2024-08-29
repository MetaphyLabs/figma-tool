import { TabsTrigger } from '@/components/ui/tabs';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { Blend, BrainCircuit, FlipHorizontal } from 'lucide-react';
import React from 'react';

const TABS = [
  {
    name: 'Opacity difference',
    icon: Blend,
    value: 'opacity-difference',
    tooltip: 'Blend',
  },
  {
    name: 'Slider difference',
    icon: FlipHorizontal,
    value: 'slider-difference',
    tooltip: 'Flip Horizontal',
  },
  {
    name: 'Analyze',
    icon: BrainCircuit,
    value: 'analyze',
    tooltip: 'Analyze',
  },
];

export function Toolbox() {
  return (
    <React.Fragment>
      {TABS.map((tab) => (
        <TooltipProvider key={tab.value} delayDuration={100}>
          <Tooltip>
            <TabsTrigger value={tab.value} className='px-4 py-2' asChild>
              <TooltipTrigger>
                <span className='sr-only'>{tab.name}</span>
                <tab.icon className='size-5' />
              </TooltipTrigger>
            </TabsTrigger>
            <TooltipContent sideOffset={10}>
              <p className='font-medium'>{tab.tooltip}</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      ))}
    </React.Fragment>
  );
}
