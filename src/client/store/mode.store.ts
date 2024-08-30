import { create } from 'zustand';

type State = {
  mode: React.CSSProperties['mixBlendMode'];
};

export type Action = {
  updateMode: (mode: State['mode']) => void;
};

export const useMode = create<State & Action>()((set) => ({
  mode: 'difference',
  updateMode: (mode) => set(() => ({ mode: mode })),
}));
