import { create } from 'zustand';

type State = {
  pixelMeasure: {
    active: boolean;
  };
};

type Action = {
  updatePixelMeasure: (fn: (pixelMeasure: State['pixelMeasure']) => State['pixelMeasure']) => void;
};

export const useToolboxstore = create<State & Action>()((set) => ({
  pixelMeasure: {
    active: false,
  },
  updatePixelMeasure: (fn) => set((state) => ({ pixelMeasure: fn(state.pixelMeasure) })),
}));
