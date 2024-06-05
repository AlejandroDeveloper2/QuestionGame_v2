import { Game, GameFormData } from "@game/types/data-types";

export const gameData: GameFormData = {
  quizId: "",
  correctAnswers: 0,
  incorrectAnswers: 0,
  accumulatedEarn: 0,
  usedWildcards: 0,
  timeTaken: 0,
  currentMatchIndex: 0,
  matches: [],
};

export const gameInitialValues: Game = {
  id: "",
  ...gameData,
};
