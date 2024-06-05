import { useGameStore } from "@game/hooks";
import { useLoading } from "@core/hooks";
import { getAnswerMark, validateAnswerControl } from "@admin/helpers";

import { ButtonWithLabel } from "@core/components";

import { AnswerOptions } from "./QuizAnswersControls.style";

const QuizAnswersControls = (): JSX.Element => {
  const { loading, toggleLoading } = useLoading();
  const { game, currentMatch, selectAnswer } = useGameStore();

  const answerMarks = getAnswerMark();

  return (
    <AnswerOptions>
      <p>Opciones de respuesta</p>
      <p style={{ fontWeight: 400 }}>
        {currentMatch?.currentQuestion.questionBody}
      </p>
      <menu>
        {currentMatch?.currentQuestion
          ? currentMatch?.currentQuestion?.answers?.map((answer, i) => (
              <ButtonWithLabel
                spinnerOnly
                loading={loading}
                disabled={validateAnswerControl(currentMatch)}
                type="button"
                label={String(answerMarks[i])}
                key={i}
                variant="primary"
                title={`Opción ${answerMarks[i]}`}
                onClick={() => {
                  if (game)
                    selectAnswer(game.id, i, game, answer, toggleLoading);
                }}
              />
            ))
          : null}
      </menu>
    </AnswerOptions>
  );
};

export default QuizAnswersControls;
