import { Quiz } from "@admin/types/data-types";
import { Match } from "@game/types/data-types";

/*Trigger for render in DOM dynamic modal */

export const dynamicModalRendered = (quiz: Quiz | null, currentMatch: Match) =>
  !quiz?.isQuizFinished && !currentMatch?.isDividedWildCardActive;

/*Triggers for opening dynamic modal */
export const gameCompleted = (quiz: Quiz | null) =>
  quiz ? quiz.isQuizCompleted : false;

export const correctMatch = (currentMatch: Match) =>
  currentMatch?.matchResult === "Correcta";

export const incorrectMatch = (currentMatch: Match) =>
  currentMatch?.matchResult === "Incorrecta";

export const waitingMatch = (currentMatch: Match) =>
  currentMatch?.isMatchPaused && currentMatch?.matchResult !== "SinResponder";
export const retiredPlayerNoAnswer = (quiz: Quiz | null, currentMatch: Match) =>
  quiz &&
  !quiz.isQuizCompleted &&
  currentMatch?.matchResult === "SinResponderRetirado";

/*Triggers for swicth dynamic modal content */

export const isAnswerReview = (quiz: Quiz | null, currentMatch: Match) =>
  currentMatch?.matchResult !== "EnEspera" && !quiz?.isQuizCompleted;

export const isGameOver = (quiz: Quiz | null, currentMatch: Match) =>
  currentMatch?.matchResult !== "EnEspera" && quiz?.isQuizCompleted;
export const matchPaused = (currentMatch: Match) => currentMatch?.isMatchPaused;
