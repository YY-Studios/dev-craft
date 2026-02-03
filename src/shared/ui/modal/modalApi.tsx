import Button from '../Button';
import { getModalController } from './modalController';
import { Modal } from './ModalRoot';

//함수형 API (명령형 사용)
type ModalOptions = {
  title?: string;
  description?: string;
  confirmText?: string;
  cancelText?: string;
};

export const modal = {
  alert: (message: string, options?: ModalOptions) => {
    return new Promise<void>((resolve) => {
      const { open, close } = getModalController();

      const id = open({
        component: (
          <Modal.Content>
            <Modal.Header>{options?.title || '알림'}</Modal.Header>
            <Modal.Body>{message}</Modal.Body>
            <Modal.Footer>
              <Button
                onClick={() => {
                  close(id);
                  resolve();
                }}
              >
                {options?.confirmText || '확인'}
              </Button>
            </Modal.Footer>
          </Modal.Content>
        ),
        onClose: () => resolve(),
      });
    });
  },

  confirm: (message: string, options?: ModalOptions) => {
    return new Promise<boolean>((resolve) => {
      const { open, close } = getModalController();

      const id = open({
        component: (
          <Modal.Content>
            <Modal.Header>{options?.title || '확인'}</Modal.Header>
            <Modal.Body>{message}</Modal.Body>
            <Modal.Footer>
              <button
                onClick={() => {
                  close(id);
                  resolve(false);
                }}
              >
                {options?.cancelText || '취소'}
              </button>
              <button
                onClick={() => {
                  close(id);
                  resolve(true);
                }}
              >
                {options?.confirmText || '확인'}
              </button>
            </Modal.Footer>
          </Modal.Content>
        ),
        onClose: () => resolve(false),
      });
    });
  },

  custom: (component: React.ReactNode, options?: ModalOptions) => {
    return new Promise<boolean>((resolve) => {
      const { open, close } = getModalController();

      const id = open({
        component: (
          <Modal.Content>
            <Modal.Body>{component}</Modal.Body>
          </Modal.Content>
        ),
        onClose: () => resolve(false),
      });
    });
  },
};
