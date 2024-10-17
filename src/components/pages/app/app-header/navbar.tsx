'use client';

import { Moon, Sun, Share2 } from 'lucide-react';
import { useTheme } from 'next-themes';

import { Button } from '@/components/ui/button';
import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';
import { Toast } from '@/components/ui/toast';

export function NavbarComponent() {
  const { theme, setTheme } = useTheme();
  const [isCopied, setIsCopied] = useState(false);
  
    const handleShareClick = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Design Blend',
          url: window.location.href,
        });
      } catch (error) {
        // Fallback to copying URL if share fails
        copyUrlToClipboard();
      }
    } else {
      // Fallback to copying URL if share API is not supported
      copyUrlToClipboard();
    }
  };

  const copyUrlToClipboard = () => {
    navigator.clipboard.writeText(window.location.href);
    setIsCopied(true);
    Toast({
      title: 'URL copied to clipboard!',
    });
    setTimeout(() => setIsCopied(false), 2000); 
  };

  return (
    <nav className='flex items-center justify-between p-4 bg-background'>
      <div className='flex items-center space-x-2'>
        {/* <Image src='/logo.png' alt='logo' width={25} height={25} /> */}
        <span className='text-lg font-semibold'>
          {' '}
          <Link href={'/'}>Design blend</Link>
        </span>
      </div>
      <div className='flex items-center space-x-2'>
        <Button onClick={copyUrlToClipboard} variant='ghost' size='icon' className='rounded-lg'>
          <Share2 className='h-5 w-5' />
          <span className='sr-only'>Share</span>
        </Button>
        <Button variant='ghost' size='icon' onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}>
          <Sun className='h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0' />
          <Moon className='absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100' />
          <span className='sr-only'>Toggle theme</span>
        </Button>
      </div>
    </nav>
  );
}