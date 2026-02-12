import { create } from 'zustand';

interface DocumentState {
  document: string | null;
  isPending: boolean;
  isError: boolean;
  setDocument: (doc: string | null) => void;
  setPending: (pending: boolean) => void;
  setError: (error: boolean) => void;
  reset: () => void;
}

export const usedocumentStore = create<DocumentState>((set) => ({
  document: null,
  isPending: false,
  isError: false,
  setDocument: (doc) => set({ document: doc, isPending: false, isError: false }),
  setPending: (pending) => set({ isPending: pending }),
  setError: (error) => set({ isError: error }),
  reset: () => set({ document: null, isPending: false, isError: false }),
}));
