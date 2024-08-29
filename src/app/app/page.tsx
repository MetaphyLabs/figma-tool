import Analyze from '@/components/pages/app/analyze';
import { AppDesignUpload } from '@/components/pages/app/app-design-upload';
import { AppHeader } from '@/components/pages/app/app-header/base-app-header';
import { DesignBlend } from '@/components/pages/app/design-blend';
import { DesignCompare } from '@/components/pages/app/design-compare';
import { FigmaDesignUpload } from '@/components/pages/app/figma-design-upload';
import { Toolbox as BaseToolbox } from '@/components/pages/app/toolbox/base-toolbox';
import { ToolBox } from '@/components/pages/app/toolbox/tools/base-tools';
import { Tabs, TabsContent, TabsList } from '@/components/ui/tabs';
import React from 'react';

import { AppUpload as BaseAppUpload } from '@/components/pages/app/app-upload/base-app-upload';

export default function Page() {
  return (
    <React.Fragment>
      <AppHeader />
      <main>
        <section>
          <Tabs defaultValue='figma-design-upload' className='w-full'>
            <div className='fixed bottom-3 left-1/2 -translate-x-1/2 flex items-stretch justify-center gap-2.5'>
              <TabsList className='h-auto gap-2'>
                <BaseAppUpload />
              </TabsList>
              <TabsList className='h-auto gap-2'>
                <BaseToolbox />
              </TabsList>
              <ToolBox />
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
