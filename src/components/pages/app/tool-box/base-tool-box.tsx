'use client';

import { useAppDesignUploadStore } from '@/client/store/app-design-upload.store';
import { useFigmaDesignUploadStore } from '@/client/store/figma-design-upload.store';
import { useToolboxstore } from '@/client/store/toolbox.store';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import { Route } from 'lucide-react';
import React, { useRef } from 'react';

export function ToolBox() {
  return (
    <div className=''>
      <PixelMeasure />
    </div>
  );
}

function PixelMeasure() {
  const { active } = useToolboxstore((state) => state.pixelMeasure);
  const updatePixelMeasure = useToolboxstore((state) => state.updatePixelMeasure);
  const appDesignStoreBlob = useAppDesignUploadStore((state) => state.blob);
  const figmaDesignStoreBlob = useFigmaDesignUploadStore((state) => state.blob);

  function handleClick() {
    if (!appDesignStoreBlob.status || !figmaDesignStoreBlob.status) {
      updatePixelMeasure((prev) => ({ ...prev, active: false }));
      return;
    }

    updatePixelMeasure((prev) => ({ ...prev, active: !prev.active }));
  }

  return (
    <Button className={`h-full ${active ? '' : 'text-muted-foreground'}`} variant={active ? 'default' : 'secondary'} onClick={handleClick}>
      <Route size={20} />
    </Button>
  );
}

type Coordinates = {
  id: number;
  x: number;
  y: number;
};

export function PixelMeasureWrapper({ children }: React.PropsWithChildren) {
  const parentRef = useRef<React.ElementRef<'div'>>(null);
  const { active } = useToolboxstore((state) => state.pixelMeasure);
  const updatePixelMeasure = useToolboxstore((state) => state.updatePixelMeasure);
  const [coordinates, setCoordinates] = React.useState<Coordinates[]>([]);

  function handleClick(e: React.MouseEvent<HTMLDivElement, MouseEvent>) {
    if (!active || coordinates.length > 1) return;

    const rect = (e.target as HTMLDivElement).getBoundingClientRect();
    const x = e.clientX - rect.x;
    const y = e.clientY - rect.y;

    setCoordinates((prev) => [...prev, { id: prev.length + 1, x, y }]);
    coordinates.length > 0 && updatePixelMeasure((prev) => ({ ...prev, active: false }));
  }

  return (
    <div
      className='relative data-[pixel=true]:cursor-crosshair data-[pixel]:pointer-events-auto data-[pixel=false]:cursor-default data-[pixel=false]:pointer-events-none'
      ref={parentRef}
      data-pixel={active}
      onClick={handleClick}
    >
      {children}
      {coordinates.length > 0 && (
        <React.Fragment>
          {coordinates.map((val, index) => {
            const distance = {
              x: Math.round(coordinates[1]?.x - coordinates[0].x),
              y: Math.round(coordinates[1]?.y - coordinates[0].y),
            };

            return <Point key={val.id} parentRef={parentRef} setCoordinates={setCoordinates} val={val} index={index} distance={distance} />;
          })}
        </React.Fragment>
      )}
      {coordinates.length === 2 && (
        <svg width='200' height='200' className='absolute w-full h-full inset-0'>
          <title> </title>
          <line
            className='stroke-violet-300'
            x1={coordinates[0].x + 4}
            y1={coordinates[0].y + 4}
            x2={coordinates[1].x + 4}
            y2={coordinates[1].y + 4}
            strokeWidth='2'
            strokeLinecap='round'
          />
        </svg>
      )}
    </div>
  );
}

interface PointProps {
  val: Coordinates;
  parentRef: React.RefObject<HTMLDivElement>;
  setCoordinates: React.Dispatch<React.SetStateAction<Coordinates[]>>;
  index: number;
  distance: { x: number; y: number };
}

function Point({ val, parentRef, setCoordinates, index, distance }: PointProps) {
  const pointRef = useRef<React.ElementRef<typeof motion.div>>(null);

  function handleDrag() {
    if (!pointRef.current || !parentRef.current) return;

    const style = window.getComputedStyle(pointRef.current);
    const { m41: translateX, m42: translateY } = new DOMMatrixReadOnly(style.transform);

    setCoordinates((prev) =>
      prev.map((item) => {
        if (item.id === val.id) {
          const x = translateX;
          const y = translateY;

          return { ...item, x, y };
        }

        return item;
      }),
    );
  }

  return (
    <motion.div
      key={val.id}
      ref={pointRef}
      className='absolute left-0 top-0 z-30 hover:cursor-grab active:cursor-grabbing size-2 rounded-full bg-violet-300'
      initial={{ x: val.x, y: val.y }}
      onDrag={handleDrag}
      dragConstraints={parentRef}
      dragMomentum={false}
      drag
    >
      {index === 1 && (
        <div className='whitespace-nowrap text-xs bg-background text-muted-foreground border rounded-sm py-0.5 px-1.5 w-max -translate-x-[calc(50%_-_4px)] -translate-y-[calc(100%_+_4px)]'>
          <span>
            x: {distance.x}px <br /> y: {distance.y}px
          </span>
        </div>
      )}
    </motion.div>
  );
}
