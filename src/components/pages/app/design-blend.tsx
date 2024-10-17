'use client';

import { useAppDesignUploadStore } from '@/client/store/app-design-upload.store';
import { useFigmaDesignUploadStore } from '@/client/store/figma-design-upload.store';
import { Slider } from '@/components/ui/slider';
import React from 'react';
import { PixelMeasureProvider } from './toolbox/tools/pixel-measure/pixel-measure-provider';

export function DesignBlend() {
  const [opacity, setOpacity] = React.useState([0.5]);

  const figmaBlob = useFigmaDesignUploadStore((state) => state.blob);
  const appBlob = useAppDesignUploadStore((state) => state.blob);

   if (!figmaBlob.url || !appBlob.url) {
    return (
      <div className='flex flex-col items-center justify-center h-[75vh] bg-muted dark:bg-muted/60 rounded-md'>
        <p className='text-lg text-muted-foreground'>Please upload both Figma and App design images to begin blending.</p>
      </div>
    );
  }

  return (
    <div>
      <div className='bg-muted dark:bg-muted/60 rounded-md'>
        <PixelMeasureProvider>
          <div className='relative h-[75vh] p-2'>
            <img
              src={figmaBlob.url}
              className='w-full h-full object-contain rounded-md'
              alt='figma-design'
              style={{
                aspectRatio: '240/160',
              }}
            />
            <div style={{ opacity: opacity[0] }} className='absolute inset-0 p-2'>
              <img
                src={appBlob.url}
                className='w-full h-full object-contain rounded-md'
                alt='figma-design'
                style={{
                  aspectRatio: '240/160',
                }}
              />
            </div>
          </div>
        </PixelMeasureProvider>
      </div>
      <div className='max-w-md mx-auto mt-4'>
        <Slider defaultValue={opacity} min={0.05} max={1} step={0.01} value={opacity} onValueChange={(val) => setOpacity(val)} />
      </div>
    </div>
  );
}
