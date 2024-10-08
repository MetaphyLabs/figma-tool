'use client';

import { type PixelMeasureState, usePixelMeasure } from '@/client/store/pixel-measure.store';
import { motion } from 'framer-motion';
import React from 'react';

export function PixelMeasureProvider({ children }: React.PropsWithChildren) {
  const parentRef = React.useRef<React.ElementRef<'div'>>(null);
  const active = usePixelMeasure((state) => state.active);
  const coordinates = usePixelMeasure((state) => state.coordinates);
  const updateCoordinates = usePixelMeasure((state) => state.updateCoordinates);

  function handleClick(e: React.MouseEvent<HTMLDivElement, MouseEvent>) {
    if (!active || coordinates.length > 1) return;

    const rect = (e.target as HTMLDivElement).getBoundingClientRect();
    const x = e.clientX - rect.x;
    const y = e.clientY - rect.y;

    updateCoordinates([...coordinates, { id: coordinates.length + 1, x, y }]);
  }

  return (
    <div
      className='relative data-[pixel=true]:cursor-crosshair data-[pixel]:pointer-events-auto data-[pixel=false]:cursor-default data-[pixel=false]:pointer-events-none'
      ref={parentRef}
      data-pixel={active && coordinates.length < 2}
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

            return <Point key={val.id} parentRef={parentRef} val={val} index={index} />;
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
            strokeLinecap='round'
            strokeWidth='2'
          />
        </svg>
      )}
    </div>
  );
}

interface PointProps {
  index: number;
  val: PixelMeasureState['coordinates'][number];
  parentRef: React.RefObject<HTMLDivElement>;
}

function Point({ index, val, parentRef }: PointProps) {
  const pointRef = React.useRef<React.ElementRef<typeof motion.div>>(null);
  const coordinates = usePixelMeasure((state) => state.coordinates);
  const updateDragCoordinates = usePixelMeasure((state) => state.updateDragCoordinates);

  const distance = {
    x: Math.round(coordinates[1]?.x - coordinates[0].x),
    y: Math.round(coordinates[1]?.y - coordinates[0].y),
  };

  function handleDrag() {
    if (!pointRef.current) return;

    const style = window.getComputedStyle(pointRef.current);
    const { m41: translateX, m42: translateY } = new DOMMatrixReadOnly(style.transform);

    updateDragCoordinates({ id: val.id, x: translateX, y: translateY });
  }

  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  return React.useMemo(
    () => (
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
    ),
    [distance.x, distance.y],
  );
}
