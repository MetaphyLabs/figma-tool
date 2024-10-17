'use client';

import { useAppDesignUploadStore } from '@/client/store/app-design-upload.store';
import { useFigmaDesignUploadStore } from '@/client/store/figma-design-upload.store';
import { useMode } from '@/client/store/mode.store';
import { Compare } from '@/components/ui/compare';

export function DesignCompare() {
  const figmaBlob = useFigmaDesignUploadStore((state) => state.blob);
  const appBlob = useAppDesignUploadStore((state) => state.blob);
  const mode = useMode((state) => state.mode);

     if (!figmaBlob.url || !appBlob.url) {
      return (
        <div className='flex flex-col items-center justify-center h-[75vh] bg-muted dark:bg-muted/60 rounded-md'>
          <p className='text-lg text-muted-foreground'>Please upload both Figma and App design images to begin Comparing.</p>
        </div>
      );
    }

  return (
    <div className='bg-muted dark:bg-muted/60 rounded-md h-[75vh] p-2'>
      <Compare
        firstImage={appBlob.url}
        secondImage={figmaBlob.url}
        firstImageClassName='object-contain'
        secondImageClassname='object-contain'
        firstImageStyle={{ mixBlendMode: mode }}
        className='w-full h-full'
        slideMode='hover'
      />
    </div>
  );
}
