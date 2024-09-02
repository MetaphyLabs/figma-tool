'use client';

import Analyze from '@/components/pages/app/analyze';
import { AppDesignUpload } from '@/components/pages/app/app-design-upload';
import { DesignBlend } from '@/components/pages/app/design-blend';
import { DesignCompare } from '@/components/pages/app/design-compare';
import { FigmaDesignUpload } from '@/components/pages/app/figma-design-upload';
import { Mode } from '@/components/pages/app/mode';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { AnimatePresence, motion } from 'framer-motion';
import { Blend, BrainCircuit, Eclipse, FlipHorizontal } from 'lucide-react';
import React from 'react';
import { AppUpload as BaseAppUpload } from '../app-upload/base-app-upload';
import { Tools as BaseTools } from './tools/base-tools';
import { tools } from './tools/tools.constants';

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
    name: 'Mode',
    icon: Eclipse,
    value: 'mode',
    tooltip: 'Mode',
  },
  {
    name: 'Analyze',
    icon: BrainCircuit,
    value: 'analyze',
    tooltip: 'Analyze',
  },
];

export function Toolbox() {
  const [tab, setTab] = React.useState('figma-design-upload');

  function TabContent() {
    return (
      <React.Fragment>
        <TabsContent key='figma-design-upload' value='figma-design-upload' className='px-4 mt-0'>
          <FigmaDesignUpload />
        </TabsContent>
        <TabsContent key='app-design' value='app-design' className='px-4 mt-0'>
          <AppDesignUpload />
        </TabsContent>
        <TabsContent value='opacity-difference' className='px-4 mt-0'>
          <DesignBlend />
        </TabsContent>
        <TabsContent value='slider-difference' className='px-4 mt-0'>
          <DesignCompare />
        </TabsContent>
        <TabsContent value='analyze' className='px-4 mt-0'>
          <Analyze />
        </TabsContent>
        <TabsContent value='mode' className='px-4 mt-0'>
          <Mode />
        </TabsContent>
      </React.Fragment>
    );
  }

  return (
    <React.Fragment>
      <Tabs defaultValue='figma-design-upload' className='w-full' value={tab} onValueChange={setTab}>
        <motion.div className='fixed bottom-3 z-50 left-1/2 -translate-x-1/2 flex items-stretch justify-center gap-2.5'>
          <TabsList className='h-auto gap-2'>
            <BaseAppUpload />
          </TabsList>
          <TabsList className='h-auto gap-2'>
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
            {tools[tab as keyof typeof tools]?.length > 0 && (
              <AnimatePresence>
                <motion.div
                  className='h-7 w-0.5 rounded-full bg-neutral-700'
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0 }}
                  transition={{ type: 'tween', duration: 0.3 }}
                />
              </AnimatePresence>
            )}
            <BaseTools tab={tab} />
          </TabsList>
        </motion.div>
        <TabContent />
      </Tabs>
    </React.Fragment>
  );
}
