'use client';
import Particles from '@/components/magicui/particles';
import { Sidebar } from '@/components/navbar';
import { AppHeader } from '@/components/pages/app/app-header/base-app-header';
import { NavbarComponent } from '@/components/pages/app/app-header/navbar';
import { Toolbox } from '@/components/pages/app/toolbox/base-toolbox';
import { useTheme } from 'next-themes';
import React, { useEffect, useState } from 'react';

export default function Page() {

    const { theme } = useTheme();
    const [color, setColor] = useState('#ffffff');

    useEffect(() => {
      setColor(theme === 'dark' ? '#ffffff' : '#000000');
      console.log(theme);
    }, [theme]);


    return (
      <React.Fragment>
        <div className='relative flex flex-col h-screen w-full pl-[56px]'>
          <Particles className='absolute inset-0' quantity={300} ease={80} color={color} refresh />
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
