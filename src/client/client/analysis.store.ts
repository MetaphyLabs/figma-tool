import { create } from 'zustand';

type State = {
  text: string | null;
  
};

type Action = {
  updateText: (text: State['text']) => void;
};

export const useAnalysisStore = create<State & Action>()((set) => ({
  text: null,
  updateText: (text) => set(() => ({ text: text })),
  
}));
