import { OrganizationSelect } from '@/features/github/ui/OrganizationSelect';
import Button from '@/shared/ui/Button';
import { useState } from 'react';
import { modal } from '@/shared/ui/modal/modalApi';
export const PullRequestStepWrap = () => {
  const [step, setStep] = useState<'org' | 'repo'>('org');
  const [selectOrg, setSelectedOrg] = useState<string>('');

  const handleOrganization = () => {
    if (!selectOrg) {
      modal.alert('조직을 선택주세요');
      return;
    }
    alert(selectOrg);
    setStep('repo');
  };

  return (
    <>
      {step === 'org' && (
        <div>
          <h2>step1 조직선택</h2>
          <OrganizationSelect onSelect={setSelectedOrg} />
          <Button onClick={() => handleOrganization()}>선택</Button>
          <Button>취소(팝업꺼지기)</Button>
        </div>
      )}
      {step === 'repo' && (
        <div>
          <h2>step2 레포선택</h2>
          <p>레포리스트</p>
          <Button>선택</Button>
          <Button>취소(뒤로가기, 조직선택으로 가기)</Button>
        </div>
      )}
    </>
  );
};
