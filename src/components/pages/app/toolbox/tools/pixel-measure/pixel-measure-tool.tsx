import { useAppDesignUploadStore } from '@/client/store/app-design-upload.store';
import { useFigmaDesignUploadStore } from '@/client/store/figma-design-upload.store';
import { usePixelMeasure } from '@/client/store/pixel-measure.store';
import { Button } from '@/components/ui/button';
import { Route } from 'lucide-react';

export function PixelMeasure() {
  const active = usePixelMeasure((state) => state.active);
  const updatePixelMeasureStatus = usePixelMeasure((state) => state.updatePixelMeasureStatus);
  const updateCoordinates = usePixelMeasure((state) => state.updateCoordinates);
  const appDesignStoreBlob = useAppDesignUploadStore((state) => state.blob);
  const figmaDesignStoreBlob = useFigmaDesignUploadStore((state) => state.blob);

  function handleClick() {
    if (!appDesignStoreBlob.status || !figmaDesignStoreBlob.status) {
      updatePixelMeasureStatus(() => false);
      return;
    }

    if (active) {
      updateCoordinates([]);
    }

    updatePixelMeasureStatus((prev) => !prev);
  }

  return (
    <Button className={`h-full relative ${active ? '' : 'text-muted-foreground'}`} variant={active ? 'default' : 'secondary'} onClick={handleClick}>
      <Route size={20} />
    </Button>
  );
}
