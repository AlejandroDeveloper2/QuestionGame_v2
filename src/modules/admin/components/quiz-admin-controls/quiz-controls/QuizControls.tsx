import { Gift, LogOut, ReloadWindow } from "iconoir-react";
import { useNavigate } from "react-router-dom";

import { IconType } from "@core/types/component-types";

import { useQuestionStore, useQuizAdminStore } from "@admin/hooks";
import { useGameStore } from "@game/hooks";
import { useLoading, useModal } from "@core/hooks";
import {
  getStatusQuizBadge,
  isConsolationAwardFormVisible,
} from "@admin/helpers";

import { BadgeWithLabel, ButtonWithIcon, Modal } from "@core/components";
import {
  QuizStatictis,
  QuizOptions,
  QuizWildCards,
  QuizMatchControls,
  QuizAnswersControls,
  ConsolationAwardForm,
} from "@admin/components";

import {
  AdminQuizControlsContainer,
  AdminQuizControlsFooter,
  AnswersWildCardContainer,
  QuestionInfoContainer,
} from "./QuizControls.style";
import { TitleContainer } from "@core/styles/GlobalStyles.style";

const QuizControls = (): JSX.Element => {
  const navigate = useNavigate();

  const { loading, toggleLoading } = useLoading();
  const { loading: loadingRebootQuiz, toggleLoading: toggleLoadingRebootQuiz } =
    useLoading();
  const { isModalVisible, closeModal, openModal } = useModal();

  const { questions } = useQuestionStore();
  const { quiz, finishQuiz, restartQuiz } = useQuizAdminStore();
  const { game, currentMatch, clearGame, resetGame } = useGameStore();

  const [Icon, value] = getStatusQuizBadge(quiz ? quiz.isQuizCompleted : false);

  return (
    <>
      <AdminQuizControlsContainer>
        <TitleContainer>
          <h1>Panel de control del quiz</h1>
        </TitleContainer>

        <QuestionInfoContainer>
          <BadgeWithLabel
            id="badge-quiz-status"
            label="Estado del quiz"
            Icon={Icon as IconType}
            value={value as string}
            size="normal"
            variant="primary"
          />
          <QuizStatictis />
          <QuizOptions />
          <AnswersWildCardContainer>
            <QuizWildCards />
            <QuizAnswersControls />
          </AnswersWildCardContainer>
          <QuizMatchControls />
        </QuestionInfoContainer>
        <AdminQuizControlsFooter>
          <ButtonWithIcon
            disabled={!quiz?.isQuizCompleted}
            type="button"
            label="Terminar Quiz"
            Icon={LogOut}
            variant="danger"
            title="Finalizar con el quiz"
            loading={loading}
            onClick={() => {
              if (quiz && game)
                finishQuiz(quiz.id, toggleLoading).then(() => {
                  clearGame(game.id, quiz.id).then(() =>
                    navigate("/admin/quiz")
                  );
                });
            }}
          />
          <ButtonWithIcon
            disabled={!quiz?.isQuizCompleted}
            type="button"
            label="Reiniciar Quiz"
            Icon={ReloadWindow}
            variant="warning"
            title="Reiniciar quiz"
            loading={loadingRebootQuiz}
            onClick={() => {
              if (quiz && game)
                restartQuiz(quiz.id, questions, toggleLoadingRebootQuiz).then(
                  () => resetGame(game.id, quiz.id, quiz.questions)
                );
            }}
          />
          <ButtonWithIcon
            disabled={
              quiz && currentMatch
                ? !isConsolationAwardFormVisible(
                    currentMatch.matchResult,
                    quiz.consolationAward
                  )
                : true
            }
            type="button"
            label="Premio de compensación"
            Icon={Gift}
            variant="primary"
            title="Conceder premio de compensación"
            onClick={() => openModal()}
          />
        </AdminQuizControlsFooter>
      </AdminQuizControlsContainer>
      <Modal
        modalTitle="Premio de compensación"
        isModalVisible={isModalVisible}
        closeModal={closeModal}
      >
        <ConsolationAwardForm closeModal={closeModal} />
      </Modal>
    </>
  );
};

export default QuizControls;
