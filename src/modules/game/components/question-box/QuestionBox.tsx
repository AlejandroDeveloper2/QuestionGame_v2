import { QuestionMark } from "iconoir-react";

import { useGameStore } from "@game/hooks";
import { getAnswerMark } from "@admin/helpers";

import { Badge } from "@core/components";
import { AnswerBox } from "..";

import {
  QuestionContainer,
  QuestionBody,
  AnswerList,
} from "./QuestionBox.style";

const QuestionBox = (): JSX.Element => {
  const { currentMatch } = useGameStore();

  const answerMarks = getAnswerMark();

  return (
    <QuestionContainer>
      <QuestionBody>
        <div id="question-badge">
          <Badge
            id="question-badge"
            Icon={QuestionMark}
            variant="primary"
            size="normal"
            value=""
          />
        </div>
        <p>
          {currentMatch?.currentQuestion
            ? currentMatch?.currentQuestion?.questionBody
            : "--------"}
        </p>
      </QuestionBody>
      <AnswerList>
        {currentMatch?.currentQuestion?.answers?.map((answer, i) => (
          <AnswerBox
            key={i}
            answerId={i}
            answerMark={answerMarks[i]}
            answerData={answer}
            answerStyles={currentMatch?.answerStyles}
          />
        ))}
      </AnswerList>
    </QuestionContainer>
  );
};

export default QuestionBox;
