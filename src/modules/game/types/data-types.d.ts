import { Question } from "@admin/types/data-types";
import { AnswerOptionStyleProps } from "./component-types";

type AnswerMarkType = "A" | "B" | "C" | "D";
type MatchResultType =
  | "Correcta"
  | "Incorrecta"
  | "SinResponder"
  | "EnEspera"
  | "SinResponderRetirado";

interface GameFormData {
  quizId: string;
  correctAnswers: number;
  incorrectAnswers: number;
  accumulatedEarn: number;
  usedWildcards: number;
  timeTaken: number;
  currentMatchIndex: number;
  matches: Match[];
}

interface Game extends GameFormData {
  id: string;
}

interface Match {
  id: string;
  currentQuestionIndex: number;
  currentQuestion: Question;
  matchResult: MatchResultType;
  timerValue: number;
  isDividedWildCardActive: boolean;
  isCallWildCardActive: boolean;
  isNewAttempt: boolean;
  isMatchPaused: boolean;
  selectedAnswers: number;
  answerStyles: AnswerOptionStyleProps[];
}

export type { AnswerMarkType, MatchResultType, GameFormData, Game, Match };
