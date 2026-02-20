import { OrganizationSelect } from '@/features/github/ui/OrganizationSelect';
import Button from '@/shared/ui/Button';
import { useState } from 'react';
import { modal } from '@/shared/ui/modal/modalApi';
import { RepositorySelect } from '@/features/github/ui/RepositorySelect';
import { useRepoStore } from '@/shared/stores/useRepoStore';

interface PullRequestStepWrapProps {
  onClose: () => void;
}
export interface selectedOrgType {
  type: 'org' | 'user';
  login: string;
}

export const PullRequestStepWrap = ({ onClose }: PullRequestStepWrapProps) => {
  const [step, setStep] = useState<'org' | 'repo'>('org');
  const [selectOrg, setSelectedOrg] = useState<selectedOrgType | null>(null);
  const [selectRepo, setSelectRepo] = useState<string>('');

  const { setSelectOrg } = useRepoStore();

  const handleOrganization = () => {
    if (!selectOrg) {
      modal.alert('조직을 선택주세요');
      return;
    }
    setStep('repo');
  };
  const handleRepository = () => {
    if (!selectRepo || !selectOrg) {
      modal.alert('레포지토리를 선택주세요');
      return;
    }
    setSelectOrg(selectOrg, selectRepo);
    onClose();
  };

  return (
    <>
      {step === 'org' && (
        <div>
          <h2 className="text-2xl font-bold mb-2">조직선택</h2>
          <OrganizationSelect setSelectedOrg={setSelectedOrg} />
          <div className="flex items-center justify-end gap-2 mt-4">
            <Button onClick={() => handleOrganization()}>다음</Button>
            <Button onClick={onClose}>취소</Button>
          </div>
        </div>
      )}
      {step === 'repo' && selectOrg && (
        <div>
          <h2 className="text-2xl font-bold mb-2">레포선택</h2>
          <RepositorySelect selectOrg={selectOrg} setSelectRepo={setSelectRepo} />
          <div className="flex items-center justify-end gap-2 mt-4">
            <Button onClick={() => handleRepository()}>선택</Button>
            <Button onClick={() => setStep('org')}>이전</Button>
          </div>
        </div>
      )}
    </>
  );
};
