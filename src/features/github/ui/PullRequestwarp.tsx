import Button from '@/shared/ui/Button';
import { useState } from 'react';
import { PullRequsetSelect } from './PullRequestSelect';
import { Modal } from '@/shared/ui/modal/ModalRoot';
import { PullRequestStepWrap } from '@/widgets/pull-request-step/PullRequestStepWrap';
import { useModal } from '@/shared/ui/modal/ModalProvider';
import { PullRequsetSearch } from './PullRequsetSearch';

export const PullRequestwarp = () => {
  const { open, close } = useModal();
  const [searchQuery, setSearchQuery] = useState('');
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
      <PullRequsetSearch onSearch={setSearchQuery} />
      <PullRequsetSelect searchQuery={searchQuery} />
    </section>
  );
};
