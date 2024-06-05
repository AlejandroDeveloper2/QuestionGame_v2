import { useQuizAdminStore, useRealtimeQuiz } from "@admin/hooks";
import { useGameStore, useRealtimeGame } from "@game/hooks";

import { QuizControls } from "@admin/components";
import { NoQuizFound } from "@core/components";

const QuizAdminControlsPage = (): JSX.Element => {
  useRealtimeQuiz();
  useRealtimeGame();

  const { quiz } = useQuizAdminStore();
  const { game } = useGameStore();

  return (
    <>
      {quiz && game ? (
        <QuizControls />
      ) : (
        <NoQuizFound to="/admin/quiz" buttonLabel="Volver al panel" />
      )}
    </>
  );
};

export default QuizAdminControlsPage;
