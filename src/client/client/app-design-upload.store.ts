import { create } from 'zustand';

type State = {
  file: File | null;
  blob: {
    url: string;
    status: boolean;
  };
};

type Action = {
  updateFile: (file: State['file']) => void;
  updateBlob: (blob: State['blob']) => void;
};

export const useAppDesignUploadStore = create<State & Action>()((set) => ({
  file: null,
  blob: {
    url: '',
    status: false,
  },
  updateFile: (file) => set(() => ({ file: file })),
  updateBlob: (blob) => set(() => ({ blob: blob })),
}));
