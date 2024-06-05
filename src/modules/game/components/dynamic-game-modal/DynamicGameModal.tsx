/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from "react";

import {
  gameCompleted,
  correctMatch,
  incorrectMatch,
  waitingMatch,
  retiredPlayerNoAnswer,
  isAnswerReview,
  isGameOver,
  matchPaused,
} from "@game/constants";

import { useModal } from "@core/hooks";
import { useGameStore } from "@game/hooks";
import { useQuizAdminStore } from "@admin/hooks";

import { Modal } from "@core/components";
import { AnswerReviewWindow, GameOverWindow, PausedMatchWindow } from "..";

const DynamicGameModal = (): JSX.Element => {
  const { isModalVisible, openModal, closeModal } = useModal();

  const { currentMatch } = useGameStore();
  const { quiz } = useQuizAdminStore();

  useEffect(() => {
    if (
      gameCompleted(quiz) ||
      correctMatch(currentMatch) ||
      incorrectMatch(currentMatch) ||
      waitingMatch(currentMatch) ||
      retiredPlayerNoAnswer(quiz, currentMatch)
    )
      openModal();
    else closeModal();
  }, [
    currentMatch?.matchResult,
    currentMatch?.isMatchPaused,
    quiz?.isQuizCompleted,
  ]);

  return (
    <Modal isModalVisible={isModalVisible} closeModal={closeModal}>
      {isAnswerReview(quiz, currentMatch) ? (
        <AnswerReviewWindow closeModal={closeModal} />
      ) : isGameOver(quiz, currentMatch) ? (
        <GameOverWindow />
      ) : matchPaused(currentMatch) ? (
        <PausedMatchWindow />
      ) : null}
    </Modal>
  );
};

export default DynamicGameModal;
