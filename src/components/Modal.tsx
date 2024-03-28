import { createPortal } from 'react-dom';
import { forwardRef, ReactNode, useImperativeHandle, useRef } from 'react';

type ModalProps = {
  children?: ReactNode;
  buttonCaption: string;
};

export type ModalRef = {
  open: () => void;
};

const Modal = forwardRef<ModalRef, ModalProps>(
  ({ children, buttonCaption }, ref) => {
    const dialog = useRef<HTMLDialogElement>(null);

    useImperativeHandle(ref, () => {
      return {
        open() {
          if (dialog.current !== null) {
            dialog.current.showModal();
          } else {
            console.error('Dialog reference is null');
          }
        },
      };
    });
    const modalRoot = document.getElementById('modal-root');
    if (!modalRoot) {
      console.error('Modal root not found');
      return null;
    }

    return createPortal(
      <dialog ref={dialog}>
        {children}
        <form method='dialog'>
          <button>{buttonCaption}</button>
        </form>
      </dialog>,
      modalRoot
    );
  }
);

export default Modal;
