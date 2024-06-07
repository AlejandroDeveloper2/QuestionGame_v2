import { LogOut, MagicWand, Pause, ReloadWindow, Timer } from "iconoir-react";

import { Quiz } from "@admin/types/data-types";
import { Game } from "@game/types/data-types";

import { useQuestionStore, useQuizAdminStore } from "@admin/hooks";
import { useGameStore } from "@game/hooks";
import { useLoading } from "@core/hooks";
import {
  validateNewAttemptControl,
  validatePauseMatchControl,
  validateRestartQuestionControl,
  validateStartMatchControl,
} from "@admin/helpers";

import { IconOnlyButton } from "@core/components";

import { QuestionOptions } from "./QuizOptions.style";

const QuizOptions = (): JSX.Element => {
  const { loading, toggleLoading } = useLoading();
  const { loading: loadingPause, toggleLoading: togglePauseLoading } =
    useLoading();
  const { loading: loadingNewAttempt, toggleLoading: toggleNewAttemptLoading } =
    useLoading();
  const {
    loading: loadingRebootQuestion,
    toggleLoading: toggleRebootQuestionLoading,
  } = useLoading();
  const { loading: loadingExit, toggleLoading: toggleExitLoading } =
    useLoading();

  const { questions } = useQuestionStore();
  const { quiz } = useQuizAdminStore();
  const {
    game,
    currentMatch,
    startMatch,
    pauseMatch,
    restartMatch,
    exitMatch,
    giveNewAttempt,
  } = useGameStore();

  return (
    <QuestionOptions>
      <IconOnlyButton
        spinnerOnly
        disabled={validateStartMatchControl(quiz as Quiz, currentMatch)}
        type="button"
        Icon={Timer}
        variant="neutral"
        title="Iniciar temporizador"
        loading={loading}
        onClick={() => {
          if (game) startMatch(game.id, game, toggleLoading);
        }}
      />
      <IconOnlyButton
        spinnerOnly
        disabled={validatePauseMatchControl(quiz as Quiz, currentMatch)}
        type="button"
        Icon={Pause}
        variant="secondary"
        title="Pausar temporizador"
        loading={loadingPause}
        onClick={() => {
          if (game) pauseMatch(game.id, game, togglePauseLoading);
        }}
      />
      <IconOnlyButton
        spinnerOnly
        disabled={validateNewAttemptControl(
          game as Game,
          quiz as Quiz,
          currentMatch
        )}
        type="button"
        Icon={MagicWand}
        variant="primary"
        title="Conceder otra oportunidad"
        loading={loadingNewAttempt}
        onClick={() => {
          if (game && quiz)
            giveNewAttempt(
              game.id,
              game,
              questions,
              quiz.questions,
              toggleNewAttemptLoading
            );
        }}
      />
      <IconOnlyButton
        spinnerOnly
        disabled={validateRestartQuestionControl(quiz as Quiz, currentMatch)}
        type="button"
        Icon={ReloadWindow}
        variant="warning"
        title="Reiniciar pregunta"
        loading={loadingRebootQuestion}
        onClick={() => {
          if (game) restartMatch(game.id, game, toggleRebootQuestionLoading);
        }}
      />
      <IconOnlyButton
        spinnerOnly
        disabled={currentMatch?.matchResult !== "SinResponder"}
        type="button"
        Icon={LogOut}
        title="Retirarse de la ronda"
        variant="danger"
        loading={loadingExit}
        onClick={() => {
          if (game && quiz) exitMatch(game.id, game, toggleExitLoading);
          // exitMatch(game.id, game, toggleExitLoading).then(() => {
          //   exitQuiz(quiz.id, toggleExitLoading);
          // });
        }}
      />
    </QuestionOptions>
  );
};

export default QuizOptions;
