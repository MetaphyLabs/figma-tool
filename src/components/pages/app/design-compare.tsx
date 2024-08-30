'use client';

import { useAppDesignUploadStore } from '@/client/store/app-design-upload.store';
import { useFigmaDesignUploadStore } from '@/client/store/figma-design-upload.store';
import { useMode } from '@/client/store/mode.store';
import { Compare } from '@/components/ui/compare';

export function DesignCompare() {
  const figmaBlob = useFigmaDesignUploadStore((state) => state.blob);
  const appBlob = useAppDesignUploadStore((state) => state.blob);
  const mode = useMode((state) => state.mode);

  return (
    <div className='bg-muted/50 rounded-md h-[85vh] p-2'>
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
