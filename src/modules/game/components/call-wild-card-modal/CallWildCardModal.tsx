/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from "react";
import { Phone, Timer } from "iconoir-react";

import { CallWillCardModalProps } from "@game/types/component-types";

import { useModal } from "@core/hooks";
import { useGameStore } from "@game/hooks";

import { BadgeWithLabel, Modal } from "@core/components";

import { AnswerResultTitle, MessageContainer } from "./CallWildCardModal.style";

const CallWildCardModal = ({
  callSecondsDuration,
}: CallWillCardModalProps): JSX.Element => {
  const { isModalVisible, closeModal, openModal } = useModal();

  const { currentMatch } = useGameStore();

  useEffect(() => {
    if (currentMatch?.isCallWildCardActive) openModal();
    else closeModal();
  }, [currentMatch?.isCallWildCardActive]);

  return (
    <Modal isModalVisible={isModalVisible} closeModal={closeModal}>
      <AnswerResultTitle>LLamada a un amigo</AnswerResultTitle>
      <MessageContainer>
        <Phone id="call-icon" />
        <p>Tienes 20 segundos para que tu amigo responda!</p>
        <BadgeWithLabel
          id="badge-call-timer"
          label="Tiempo del comodin"
          Icon={Timer}
          variant="primary"
          size="medium"
          value={callSecondsDuration + "s"}
        />
      </MessageContainer>
    </Modal>
  );
};

export default CallWildCardModal;
