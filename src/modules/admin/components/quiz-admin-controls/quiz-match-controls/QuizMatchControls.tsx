import { ArrowRightCircle, LogOut } from "iconoir-react";

import { Quiz } from "@admin/types/data-types";

import { useQuizAdminStore } from "@admin/hooks";
import { useGameStore } from "@game/hooks";
import { useLoading } from "@core/hooks";
import {
  validateFinishQuizControl,
  validateNextMatchControl,
} from "@admin/helpers";

import { IconOnlyButton } from "@core/components";

import { MatchControlsContainer } from "./QuizMatchControls.style";

const QuizMatchControls = (): JSX.Element => {
  const { loading, toggleLoading } = useLoading();
  const { loading: loadingQuiz, toggleLoading: toggleQuizLoading } =
    useLoading();

  const { quiz, exitQuiz } = useQuizAdminStore();
  const { currentMatch, game, nextMatch } = useGameStore();

  return (
    <MatchControlsContainer>
      <p>Controles de la partida</p>
      <menu>
        <IconOnlyButton
          spinnerOnly
          disabled={validateNextMatchControl(quiz as Quiz, currentMatch)}
          type="button"
          Icon={ArrowRightCircle}
          variant="primary"
          title="Continuar con la siguiente pregunta"
          loading={loading}
          onClick={() => {
            if (game) nextMatch(game.id, game, toggleLoading);
          }}
        />
        <IconOnlyButton
          spinnerOnly
          disabled={validateFinishQuizControl(quiz as Quiz, currentMatch)}
          type="button"
          Icon={LogOut}
          variant="danger"
          loading={loadingQuiz}
          title="Retirarse del juego!"
          onClick={() => {
            if (quiz) exitQuiz(quiz.id, toggleQuizLoading);
          }}
        />
      </menu>
    </MatchControlsContainer>
  );
};

export default QuizMatchControls;
