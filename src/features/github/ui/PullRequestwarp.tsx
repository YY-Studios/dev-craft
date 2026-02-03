import Button from '@/shared/ui/Button';
import { PullRequsetSelect } from './PullRequestSelect';
import { Modal } from '@/shared/ui/modal/ModalRoot';
import { PullRequestStepWrap } from '@/widgets/pull-request-step/PullRequestStepWrap';
import { useModal } from '@/shared/ui/modal/ModalProvider';

export const PullRequestwarp = () => {
  const { open, close } = useModal();
  return (
    <section className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold">PR 불러오기</h2>
        <Button
          onClick={() => {
            const id = open({
              component: (
                <Modal.Content>
                  <Modal.Body>
                    <PullRequestStepWrap onClose={() => close(id)} />
                  </Modal.Body>
                </Modal.Content>
              ),
            });
          }}
        >
          repository 선택
        </Button>
      </div>

      <input
        type="text"
        placeholder="PR 제목 또는 번호 검색"
        className="w-full rounded-md border px-3 py-2 text-sm"
      />

      <PullRequsetSelect />
    </section>
  );
};
