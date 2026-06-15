import { create } from 'zustand';

interface YouthModeState {
  isYouthMode: boolean;
  xp: number;
  level: number;
  toggleYouthMode: () => void;
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
  addXp: (amount) => set((state) => ({ xp: state.xp + amount })),
}));
