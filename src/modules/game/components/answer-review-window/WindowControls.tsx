import { ArrowRight, LogOut } from "iconoir-react";

import { AnswerReviewWindowProps } from "@game/types/component-types";

import { useLoading } from "@core/hooks";
import { useQuizAdminStore } from "@admin/hooks";
import { useGameStore } from "@game/hooks";

import { ButtonWithIcon } from "@core/components";

import { Controls } from "./AnswerReviewWindow.style";

const WindowControls = ({
  closeModal,
}: AnswerReviewWindowProps): JSX.Element => {
  const { loading, toggleLoading } = useLoading();
  const { loading: loadingQuiz, toggleLoading: toggleQuizLoading } =
    useLoading();

  const { quiz, exitQuiz } = useQuizAdminStore();
  const { currentMatch, game, nextMatch } = useGameStore();

  return (
    <Controls>
      {game &&
      currentMatch?.matchResult === "Correcta" &&
      game.currentMatchIndex < game.matches.length - 1 ? (
        <ButtonWithIcon
          loading={loading}
          Icon={ArrowRight}
          label="Continuar"
          title="Continuar con la siguiente pregunta"
          type="button"
          onClick={() => {
            if (game) nextMatch(game.id, game, toggleLoading);
          }}
          variant="primary"
        />
      ) : null}
      <ButtonWithIcon
        loading={loadingQuiz}
        Icon={LogOut}
        label="Parar"
        title="Retirarse del juego"
        type="button"
        onClick={() => {
          if (quiz)
            exitQuiz(quiz.id, toggleQuizLoading).then(() => closeModal());
        }}
        variant="danger"
      />
    </Controls>
  );
};

export default WindowControls;
