'use client';

import { useAppDesignUploadStore } from '@/client/store/app-design-upload.store';
import { useFigmaDesignUploadStore } from '@/client/store/figma-design-upload.store';
import { useToolboxstore } from '@/client/store/toolbox.store';
import { Button } from '@/components/ui/button';
import { Route } from 'lucide-react';

export function Tools() {
  return (
    <div>
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
