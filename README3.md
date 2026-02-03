아, 쉽게 설명할게요!

**방법 2는 이런 흐름이에요:**

```typescriptreact
// 1. 조직/레포 선택을 하나의 컴포넌트로 만들기
function OrganizationAndRepoSelector() {
  const [step, setStep] = useState<'org' | 'repo'>('org'); // 🔹 단계 관리
  const [selectedOrg, setSelectedOrg] = useState('');

  return (
    <div>
      {/* 조직 선택 화면 */}
      {step === 'org' && (
        <div>
          <h2>조직 선택</h2>
          <OrganizationSelect
            onSelect={(org) => {
              setSelectedOrg(org);
              setStep('repo'); // 🔹 다음 단계로!
            }}
          />
        </div>
      )}

      {/* 레포 선택 화면 */}
      {step === 'repo' && (
        <div>
          <button onClick={() => setStep('org')}>← 뒤로</button>
          <h2>레포지토리 선택</h2>
          <RepositorySelect orgName={selectedOrg} />
        </div>
      )}
    </div>
  );
}

// 2. 버튼 클릭 시 이 컴포넌트를 모달로 띄우기
function MyPage() {
  const { open } = useModal();

  return (
    <button onClick={() => {
      open({ component: <OrganizationAndRepoSelector /> }); // 🔹 모달 열기
    }}>
      조직 선택
    </button>
  );
}
```

**핵심:**

- 모달 껍데기는 `useModal()`이 알아서 처리
- 모달 안에서 **조직 → 레포** 단계 전환은 컴포넌트 내부 `useState`로 처리

이해되나요?

---

---

---

import { useModal } from '@/shared/ui/modal/ModalProvider';

function MyPage() {
const { open } = useModal();

return (
<button onClick={() => {
open({
component: (
<Modal.Content>
<Modal.Body>
<OrganizationAndRepoSelector />
</Modal.Body>
</Modal.Content>
)
});
}}>
조직 선택
</button>
);
}
