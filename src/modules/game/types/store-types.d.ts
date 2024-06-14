import { Game, GameFormData, Match } from "./data-types";
import { Answer, Question } from "@admin/types/data-types";

interface GameSlice {
  games: Game[];
  game: Game | null;
  setGames: (games: Game[]) => void;
  initializeGame: (
    initialGameData: GameFormData,
    quizId: string
  ) => Promise<void>;
  startGame: (gameId: string, quizQuestions: Question[]) => Promise<void>;
  getAllGames: () => Promise<void>;
  getGame: (quizId: string) => Promise<void>;
  resetGame: (
    gameId: string,
    quizId: string,
    quizQuestions: Question[]
  ) => Promise<void>;
  updateGameStatictis: (
    gameId: string,
    gameStatictis: Partial<
      Omit<Game, "quizId" | "currentMatchIndex" | "matches">
    >
  ) => Promise<void>;
  nextMatch: (
    gameId: string,
    game: Game,
    toggleLoading: (loadingStatus: Loading) => void
  ) => Promise<void>;
  clearGame: (gameId: string, quizId: string) => Promise<void>;
  deleteGame: (gameId: string) => Promise<void>;
}

interface MatchSlice {
  currentMatch: Match;
  selectAnswer: (
    gameId: string,
    answerId: number,
    game: Game,
    selectedAnswer: Answer | null,
    toggleLoading: (loadingStatus: Loading) => void
  ) => Promise<void>;
  pauseMatch: (
    gameId: string,
    game: Game,
    toggleLoading: (loadingStatus: Loading) => void
  ) => Promise<void>;
  startMatch: (
    gameId: string,
    game: Game,
    toggleLoading: (loadingStatus: Loading) => void
  ) => Promise<void>;
  restartMatch: (
    gameId: string,
    game: Game,
    toggleLoading: (loadingStatus: Loading) => void
  ) => Promise<void>;
  spendWildCard: (
    gameId: string,
    game: Game,
    wildCard: "call" | "divided"
  ) => Promise<void>;
  inactivateWildCard: (gameId: string, game: Game) => Promise<void>;
  giveNewAttempt: (
    gameId: string,
    game: Game,
    questionBank: Question[],
    quizQuestions: Question[],
    toggleLoading: (loadingStatus: Loading) => void
  ) => Promise<void>;
  exitMatch: (
    gameId: string,
    game: Game,
    toggleLoading: (loadingStatus: Loading) => void
  ) => Promise<void>;
}

export type { GameSlice, MatchSlice };
