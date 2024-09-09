'use client';

import { useAppDesignUploadStore } from '@/client/store/app-design-upload.store';
import { useFigmaDesignUploadStore } from '@/client/store/figma-design-upload.store';
import { useMode } from '@/client/store/mode.store';
import { Slider } from '@/components/ui/slider';
import React from 'react';
import { PixelMeasureProvider } from './toolbox/tools/pixel-measure/pixel-measure-provider';

export function Mode() {
  const [opacity, setOpacity] = React.useState([0.5]);
  const mode = useMode((state) => state.mode);
  const appBlob = useAppDesignUploadStore((state) => state.blob);
  const figmaBlob = useFigmaDesignUploadStore((state) => state.blob);

  return (
    <div>
      <div className='bg-muted dark:bg-muted/60 rounded-md'>
        <PixelMeasureProvider>
          <div className='relative h-[80vh] p-2'>
            <img
              src={figmaBlob.url}
              className='w-full h-full object-contain rounded-md'
              alt='figma-design'
              style={{
                aspectRatio: '240/160',
              }}
            />
            <div style={{ opacity: opacity[0], mixBlendMode: mode }} className='absolute inset-0 p-2'>
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
