import { Xmark } from "iconoir-react";

import { ModalProps } from "@core/types/component-types";

import { ModalBody, ModalOverlay } from "./Modal.style";

const Modal = ({
  children,
  isModalVisible,
  modalTitle,
  hasCloseButton,
  closeModal,
}: ModalProps): JSX.Element => {
  return (
    <ModalOverlay ismodalvisible={String(isModalVisible)}>
      <ModalBody>
        {hasCloseButton ? (
          <Xmark id="close-modal" onClick={closeModal} />
        ) : null}
        {modalTitle ? <h1>{modalTitle}</h1> : null}
        {children}
      </ModalBody>
    </ModalOverlay>
  );
};

export default Modal;
