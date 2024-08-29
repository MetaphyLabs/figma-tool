'use client';

import { useAppDesignUploadStore } from '@/client/client/app-design-upload.store';
import { useFigmaDesignUploadStore } from '@/client/client/figma-design-upload.store';
import { Slider } from '@/components/ui/slider';
import React from 'react';
import { PixelMeasureWrapper } from './tool-box/base-tool-box';

export function DesignBlend() {
  const [opacity, setOpacity] = React.useState([0.5]);

  const figmaBlob = useFigmaDesignUploadStore((state) => state.blob);
  const appBlob = useAppDesignUploadStore((state) => state.blob);

  return (
    <div>
      <div className='bg-muted/50 rounded-md'>
        <PixelMeasureWrapper>
          <div className='relative h-[82vh] p-2'>
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
        </PixelMeasureWrapper>
      </div>
      <div className='max-w-md mx-auto mt-4'>
        <Slider defaultValue={opacity} min={0.05} max={1} step={0.01} value={opacity} onValueChange={(val) => setOpacity(val)} />
      </div>
    </div>
  );
}
