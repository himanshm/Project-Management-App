import { createPortal } from 'react-dom';
import { forwardRef, ReactNode, useImperativeHandle, useRef } from 'react';

import Button from './Button.tsx';

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
      <dialog
        ref={dialog}
        className='backdrop:bg-stone-900/90 p-4 rounded-md shadow-md'
      >
        {children}
        <form method='dialog' className='mt-4 text-right'>
          <Button>{buttonCaption}</Button>
        </form>
      </dialog>,
      modalRoot
    );
  }
);

export default Modal;
