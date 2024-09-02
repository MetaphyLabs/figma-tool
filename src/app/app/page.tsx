import { AppHeader } from '@/components/pages/app/app-header/base-app-header';
import { Toolbox } from '@/components/pages/app/toolbox/base-toolbox';
import React from 'react';

export default function Page() {
  return (
    <React.Fragment>
      <AppHeader />
      <main>
        <section>
          <Toolbox />
        </section>
      </main>
    </React.Fragment>
  );
}
