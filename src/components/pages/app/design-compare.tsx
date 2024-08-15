'use client';

import { useAppDesignUploadStore } from '@/client/client/app-design-upload.store';
import { useFigmaDesignUploadStore } from '@/client/client/figma-design-upload.store';
import { Compare } from '@/components/ui/compare';

export function DesignCompare() {
  const figmaBlob = useFigmaDesignUploadStore((state) => state.blob);
  const appBlob = useAppDesignUploadStore((state) => state.blob);

  return (
    <div className='bg-muted/50 rounded-md h-[60vh] p-2'>
      <Compare
        firstImage={figmaBlob.url}
        secondImage={appBlob.url}
        firstImageClassName='object-contain'
        secondImageClassname='object-contain'
        className='w-full h-full'
        slideMode='hover'
      />
    </div>
  );
}
