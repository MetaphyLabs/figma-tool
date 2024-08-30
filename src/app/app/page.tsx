import Analyze from '@/components/pages/app/analyze';
import { AppDesignUpload } from '@/components/pages/app/app-design-upload';
import { AppHeader } from '@/components/pages/app/app-header/base-app-header';
import { DesignBlend } from '@/components/pages/app/design-blend';
import { DesignCompare } from '@/components/pages/app/design-compare';
import { FigmaDesignUpload } from '@/components/pages/app/figma-design-upload';
import { Mode } from '@/components/pages/app/mode';
import { Toolbox } from '@/components/pages/app/toolbox/base-toolbox';
import { TabsContent } from '@/components/ui/tabs';
import React from 'react';

export default function Page() {
  function TabContent() {
    return (
      <React.Fragment>
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
        <TabsContent value='mode' className='px-6 mt-4'>
          <Mode />
        </TabsContent>
      </React.Fragment>
    );
  }

  return (
    <React.Fragment>
      <AppHeader />
      <main>
        <section>
          <Toolbox>
            <TabContent />
          </Toolbox>
        </section>
      </main>
    </React.Fragment>
  );
}
