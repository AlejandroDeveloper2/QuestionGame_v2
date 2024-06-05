import { AnswerBoxProps } from "@game/types/component-types";

import { useGameStore } from "@game/hooks";
import { useLoading } from "@core/hooks";

import { AnswerBody, AnswerMarkBox } from "./AnswerBox.style";

const AnswerBox = ({
  answerId,
  answerMark,
  answerData,
  answerStyles,
}: AnswerBoxProps): JSX.Element => {
  const { loading, toggleLoading } = useLoading();
  const { game, selectAnswer } = useGameStore();

  return (
    <AnswerBody
      disabled={loading.isLoading}
      {...answerStyles[answerId]}
      onClick={() => {
        if (game)
          selectAnswer(game.id, answerId, game, answerData, toggleLoading);
      }}
    >
      <AnswerMarkBox>
        <span>{answerMark}</span>
      </AnswerMarkBox>
      <p>{answerData.answerText}</p>
    </AnswerBody>
  );
};

export default AnswerBox;
