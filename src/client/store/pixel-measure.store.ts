import { create } from 'zustand';

export type PixelMeasureState = {
  active: boolean;
  coordinates: {
    id: number;
    x: number;
    y: number;
  }[];
};

export type PixelMeasureAction = {
  updatePixelMeasureStatus: (fn: (pixelMeasure: PixelMeasureState['active']) => PixelMeasureState['active']) => void;
  updateCoordinates: (coordinates: PixelMeasureState['coordinates']) => void;
  updateDragCoordinates: (coordinate: PixelMeasureState['coordinates'][number]) => void;
};

export const usePixelMeasure = create<PixelMeasureState & PixelMeasureAction>()((set) => ({
  active: false,
  coordinates: [],
  updatePixelMeasureStatus: (fn) => set((state) => ({ active: fn(state.active) })),
  updateCoordinates: (coordinates) => set(() => ({ coordinates: coordinates })),
  updateDragCoordinates: (coordinate) =>
    set((state) => ({
      ...state,
      coordinates: state.coordinates.map((item) => {
        if (item.id === coordinate.id) {
          return { ...item, x: coordinate.x, y: coordinate.y };
        }

        return item;
      }),
    })),
}));
