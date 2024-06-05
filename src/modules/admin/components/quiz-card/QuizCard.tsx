import { useNavigate } from "react-router-dom";
import {
  Copy,
  Emoji,
  EmojiQuite,
  EmojiSurprise,
  Play,
  QuestionMark,
  SwitchOff,
} from "iconoir-react";

import { QuizCardProps } from "@admin/types/component-types";

import { useQuestionStore, useQuizAdminStore } from "@admin/hooks";
import { useLoading } from "@core/hooks";
import { copyToClipboard } from "@core/helpers";

import {
  BadgeWithLabel,
  Badge,
  ButtonWithIcon,
  IconOnlyButton,
} from "@core/components";

import {
  CopyCodeSection,
  QuizCardContainer,
  QuizDetails,
} from "./QuizCard.style";

const QuizCard = ({ quiz }: QuizCardProps): JSX.Element => {
  const navigate = useNavigate();
  const { loading, toggleLoading } = useLoading();

  const { quizzes, startQuiz } = useQuizAdminStore();
  const { questions } = useQuestionStore();

  return (
    <QuizCardContainer>
      <h2 id="card-quiz-title">Quiz</h2>
      <QuizDetails>
        <h3>Detalles del quiz</h3>
        <CopyCodeSection>
          <strong>
            <span>Codigo quiz:</span>
            {quiz.id}
          </strong>
          <IconOnlyButton
            Icon={Copy}
            title="Copiar codigo de quiz"
            type="button"
            onClick={() => {
              copyToClipboard(quiz.id, "¡Codigo copiado!");
            }}
            variant="primary"
          />
        </CopyCodeSection>
        <ul>
          <li>
            <Badge
              id="questions-amount-badge"
              Icon={QuestionMark}
              value={
                quiz.easyQuestions + quiz.mediumQuestions + quiz.expertQuestions
              }
              size="normal"
              variant="neutral"
            />
          </li>
          <li>
            <Badge
              id="basic-questions-amount-badge"
              Icon={Emoji}
              value={quiz.easyQuestions}
              size="normal"
              variant="success"
            />
          </li>
          <li>
            <Badge
              id="medium-questions-amount-badge"
              Icon={EmojiQuite}
              value={quiz.mediumQuestions}
              size="normal"
              variant="warning"
            />
          </li>
          <li>
            <Badge
              id="expert-questions-amount-badge"
              Icon={EmojiSurprise}
              value={quiz.mediumQuestions}
              size="normal"
              variant="danger"
            />
          </li>
        </ul>
        <BadgeWithLabel
          label="Estado del quiz"
          id="quiz-status-badge"
          Icon={SwitchOff}
          value={
            quiz.isQuizFinished
              ? "Terminado"
              : quiz.isQuizStarted
              ? "Activo"
              : "Sin empezar"
          }
          size="normal"
          variant="neutral"
        />
      </QuizDetails>
      <ButtonWithIcon
        type="button"
        Icon={Play}
        label={quiz.isQuizStarted ? "Reanudar quiz" : "Empezar quiz"}
        variant={quiz.isQuizStarted ? "warning" : "primary"}
        title={quiz.isQuizStarted ? "Continuar quiz" : "Iniciar quiz"}
        loading={loading}
        onClick={() => {
          if (quizzes.length === 1 && !quiz.isQuizStarted)
            startQuiz(quiz.id, questions, toggleLoading).then(() => {
              navigate(`/admin/quiz/${quiz.id}`);
            });
          else navigate(`/admin/quiz/${quiz.id}`);
        }}
      />
    </QuizCardContainer>
  );
};

export default QuizCard;
