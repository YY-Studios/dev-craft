import { create } from 'zustand';

interface PrStore {
  selectedPrUrl: string | null;
  setSelectedPrUrl: (prUrl: string | null) => void;
}

export const usePrStore = create<PrStore>((set) => ({
  selectedPrUrl: null,
  setSelectedPrUrl: (prUrl) => set({ selectedPrUrl: prUrl }),
}));
