import { ICONS } from '@/components/global/icons';
import Analyze from '@/components/pages/app/analyze';
import { AppDesignUpload } from '@/components/pages/app/app-design-upload';
import { AppHeader } from '@/components/pages/app/app-header/base-app-header';
import { DesignBlend } from '@/components/pages/app/design-blend';
import { DesignCompare } from '@/components/pages/app/design-compare';
import { FigmaDesignUpload } from '@/components/pages/app/figma-design-upload';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { Blend, Component, FlipHorizontal , ChartBar} from 'lucide-react';
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
    icon: ChartBar,
    value: 'analyze',
    tooltip: 'Analyze',
  }
];

export default function Page() {
  return (
    <React.Fragment>
      <AppHeader />
      <main>
        <section>
          <Tabs defaultValue='figma-design-upload' className='w-full'>
            <div className='fixed bottom-3 left-1/2 -translate-x-1/2'>
              <TabsList className='h-auto gap-2'>
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
              </TabsList>
            </div>

            <TabsContent value='figma-design-upload' className='px-6 mt-4'>
              <FigmaDesignUpload />
            </TabsContent>
            <TabsContent value='app-design' className='px-6 mt-4'>
              <AppDesignUpload />
            </TabsContent>
            <TabsContent value='opacity-difference' className='px-6 mt-4'>
              <DesignBlend />
            </TabsContent>
            <TabsContent value='slider-difference' className='px-6 mt-4'>
              <DesignCompare />
            </TabsContent>
            <TabsContent value='analyze' className='px-6 mt-4'>
              <Analyze />
            </TabsContent>
          </Tabs>
        </section>
      </main>
    </React.Fragment>
  );
}
