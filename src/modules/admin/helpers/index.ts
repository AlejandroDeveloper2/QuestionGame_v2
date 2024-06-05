import {
  DoubleCheck,
  Hourglass,
  QuestionMark,
  Timer,
  Xmark,
} from "iconoir-react";

import { BadgeVariantType, IconType } from "@core/types/component-types";
import {
  AnswerMarkType,
  Game,
  Match,
  MatchResultType,
} from "@game/types/data-types";
import { Answer, Quiz } from "@admin/types/data-types";

export const getStatusQuizBadge = (
  isQuizCompleted: boolean
): (IconType | string)[] => {
  const statusQuizValues = !isQuizCompleted
    ? [Hourglass, "En progreso"]
    : [DoubleCheck, "Terminado"];
  return statusQuizValues;
};

export const validateStartMatchControl = (
  quiz: Quiz,
  match: Match
): boolean => {
  const disabled: boolean =
    quiz?.isQuizCompleted ||
    !match?.isMatchPaused ||
    match?.matchResult !== "EnEspera";

  return disabled;
};

export const validatePauseMatchControl = (
  quiz: Quiz,
  match: Match
): boolean => {
  const disabled: boolean =
    quiz?.isQuizCompleted ||
    match?.isMatchPaused ||
    match?.matchResult !== "EnEspera";

  return disabled;
};

export const validateNewAttemptControl = (
  game: Game,
  quiz: Quiz,
  match: Match
): boolean => {
  const disabled: boolean =
    quiz?.isQuizCompleted ||
    match?.isNewAttempt ||
    game?.incorrectAnswers > 2 ||
    match?.matchResult === "Correcta" ||
    match?.matchResult === "EnEspera" ||
    match?.matchResult === "SinResponderRetirado" ||
    quiz?.consolationAward !== "";
  return disabled;
};

export const validateRestartQuestionControl = (
  quiz: Quiz,
  match: Match
): boolean => {
  const disabled: boolean =
    quiz?.isQuizCompleted || match?.matchResult !== "SinResponder";
  return disabled;
};

export const getCorrectAnswer = (currentQuestionAnswers: Answer[]) => {
  const answerMarks: AnswerMarkType[] = ["A", "B", "C", "D"];
  const correctAnswer: Answer = currentQuestionAnswers?.filter(
    (answer) => answer.isCorrectAnswer
  )[0];
  const indexAnswerMark: number = currentQuestionAnswers?.findIndex(
    (answer) => answer.isCorrectAnswer
  );

  return { ...correctAnswer, answerMark: answerMarks[indexAnswerMark] };
};

export const getPlayerAnswerBadgeInfo = (
  matchResult: MatchResultType
): (IconType | BadgeVariantType | string)[] => {
  const badgeElements =
    matchResult === "SinResponder"
      ? [QuestionMark, "warning", "Sin responder"]
      : matchResult === "Correcta"
      ? [DoubleCheck, "success", "Correcta"]
      : matchResult === "Incorrecta"
      ? [Xmark, "danger", "Incorrecta"]
      : matchResult === "EnEspera"
      ? [Timer, "neutral", "En Espera"]
      : [Timer, "neutral", "Retirado"];
  return badgeElements;
};

export const isConsolationAwardFormVisible = (
  matchResult: MatchResultType,
  consolationAward: string
): boolean => {
  const visible: boolean =
    (matchResult === "Incorrecta" || matchResult === "SinResponderRetirado") &&
    consolationAward === "";
  return visible;
};

export const validateDividedControl = (quiz: Quiz, match: Match): boolean => {
  const disabled: boolean =
    match?.isDividedWildCardActive ||
    quiz?.isQuizCompleted ||
    (match?.isMatchPaused && match?.matchResult !== "SinResponder");
  return disabled;
};

export const validateCallControl = (quiz: Quiz, match: Match): boolean => {
  const disabled: boolean =
    match?.isCallWildCardActive ||
    quiz?.isQuizCompleted ||
    (match?.isMatchPaused && match?.matchResult !== "SinResponder");
  return disabled;
};

export const validateNextMatchControl = (quiz: Quiz, match: Match): boolean => {
  const disabled: boolean =
    (match?.matchResult === "EnEspera" && !quiz?.isQuizCompleted) ||
    (match?.currentQuestionIndex >= quiz?.questions?.length - 1 &&
      !quiz?.isQuizCompleted &&
      match?.matchResult !== "EnEspera") ||
    quiz?.isQuizCompleted ||
    match?.matchResult === "SinResponder" ||
    match?.matchResult === "Incorrecta" ||
    match?.matchResult === "SinResponderRetirado";

  return disabled;
};

export const validateFinishQuizControl = (
  quiz: Quiz,
  match: Match
): boolean => {
  const disabled: boolean =
    match?.matchResult === "EnEspera" ||
    match?.matchResult === "SinResponder" ||
    (quiz?.isQuizCompleted && quiz.consolationAward === "") ||
    (match?.matchResult === "Incorrecta" && quiz?.consolationAward === "") ||
    quiz?.isQuizCompleted ||
    (match?.matchResult === "SinResponderRetirado" &&
      quiz?.consolationAward === "");
  return disabled;
};

export const getAnswerMark = (): AnswerMarkType[] => {
  return ["A", "B", "C", "D"];
};

export const validateAnswerControl = (match: Match): boolean => {
  const disabled: boolean =
    match?.isMatchPaused &&
    match?.matchResult !== "SinResponder" &&
    !match?.isDividedWildCardActive;
  return disabled;
};

export const getUpdatedQuizzesState = (
  currentQuizzes: Quiz[],
  updatedQuiz: Quiz
): Quiz[] => {
  const updatedQuizzes: Quiz[] = currentQuizzes.map((quiz) => {
    if (quiz.id === updatedQuiz.id) return updatedQuiz;
    return quiz;
  });
  return updatedQuizzes;
};
