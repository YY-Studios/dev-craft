import { create } from 'zustand';

interface DocumentState {
  document: string | null;
  title: string;
  chartHtml: string | '';
  prUrl: string;
  tags: string[];
  repoName: string;
  repoOwner: string;
  isPending: boolean;
  isError: boolean;
  setDocument: (doc: string | null) => void;
  setTitle: (tit: string) => void;
  setPrUrl: (prUrl: string) => void;
  setTags: (tags: string[]) => void;
  setRepoName: (name: string) => void;
  setRepoOwner: (owner: string) => void;
  setChartHtml: (html: string | '') => void;
  setPending: (pending: boolean) => void;
  setError: (error: boolean) => void;
  reset: () => void;
}

export const usedocumentStore = create<DocumentState>((set) => ({
  document: null,
  chartHtml: '',
  title: '',
  prUrl: '',
  tags: [],
  repoName: '',
  repoOwner: '',
  isPending: false,
  isError: false,
  setDocument: (doc) => set({ document: doc, isPending: false, isError: false }),
  setTitle: (tit) => set({ title: tit }),
  setPrUrl: (prUrl) => set({ prUrl: prUrl }),
  setTags: (tags) => set({ tags: tags }),
  setRepoName: (name) => set({ repoName: name }),
  setRepoOwner: (owner) => set({ repoOwner: owner }),
  setChartHtml: (html) => set({ chartHtml: html, isPending: false, isError: false }),
  setPending: (pending) => set({ isPending: pending }),
  setError: (error) => set({ isError: error }),
  reset: () => set({ document: null, isPending: false, isError: false }),
}));
