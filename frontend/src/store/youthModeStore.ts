import { create } from 'zustand';

interface YouthModeState {
  isYouthMode: boolean;
  xp: number;
  level: number;
  toggleYouthMode: () => void;
  setYouthMode: (val: boolean) => void;
  addXp: (amount: number) => void;
}

export const useYouthModeStore = create<YouthModeState>((set) => ({
  isYouthMode: false,
  xp: 1250,
  level: 10, // Kader Muda
  toggleYouthMode: () => {
    set((state) => {
      const newState = !state.isYouthMode;
      if (newState) {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
      return { isYouthMode: newState };
    });
  },
  setYouthMode: (val) => {
    set(() => {
      if (val) {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
      return { isYouthMode: val };
    });
  },
  addXp: (amount) => set((state) => ({ xp: state.xp + amount })),
}));
