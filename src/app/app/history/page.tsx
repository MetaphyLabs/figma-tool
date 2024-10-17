import { Sidebar } from '@/components/navbar';
import { AppHeader } from '@/components/pages/app/app-header/base-app-header';
import { NavbarComponent } from '@/components/pages/app/app-header/navbar';
import { Toolbox } from '@/components/pages/app/toolbox/base-toolbox';
import React from 'react';

export default function Page() {
  return (
    <React.Fragment>
      <div className='flex flex-col h-screen w-full pl-[56px]'>
        <Sidebar />
        <div>
          <NavbarComponent />
          <main>
            <section>
              <Toolbox />
            </section>
          </main>
        </div>
      </div>
    </React.Fragment>
  );
}
