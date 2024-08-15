import { ThemeToggle } from '@/components/global/theme-toggle';
import Link from 'next/link';

export function AppHeader() {
  return (
    <header className='h-16 px-6 py-2 flex items-center justify-center'>
      <div className='flex items-center justify-between gap-4 w-full'>
        <div>
          <Link href={'/'}>Design blend</Link>
        </div>
        <div>
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
