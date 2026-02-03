import { create } from 'zustand';
import { selectedOrgType } from '@/widgets/pull-request-step/PullRequestStepWrap';
import { persist, createJSONStorage } from 'zustand/middleware';
interface RepoStore {
  selectOrg: selectedOrgType | null;
  selectRepo: string;
  setSelectOrg: (org: selectedOrgType, selectRepo: string) => void;
  clearRepo: () => void;
}

export const useRepoStore = create<RepoStore>()(
  persist(
    (set) => ({
      selectOrg: null,
      selectRepo: '',
      setSelectOrg: (selectOrg, selectRepo) => set({ selectOrg, selectRepo }),
      clearRepo: () => set({ selectOrg: null, selectRepo: '' }),
    }),
    {
      name: 'repo-storage',
      storage: createJSONStorage(() => localStorage),
    },
  ),
);
