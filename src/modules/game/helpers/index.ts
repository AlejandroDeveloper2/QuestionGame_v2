import { Emoji, EmojiQuite, EmojiSurprise } from "iconoir-react";

import { Difficulty } from "@admin/types/data-types";
import { ButtonVariantType, IconType } from "@core/types/component-types";
import { Game, Match, MatchResultType } from "@game/types/data-types";
import { AnswerOptionStyleProps } from "@game/types/component-types";

export const generateUnicId = (): string => {
  return Math.random().toString(30).substring(2);
};

export const increaseMatchIndex = (currentMatchIndex: number): number => {
  return currentMatchIndex + 1;
};

export const manageAccumulatedEarn = (
  action: "increase" | "reset",
  currentAccumulatedEarn: number,
  questionReward: number
): number => {
  if (action === "increase") return currentAccumulatedEarn + questionReward;
  return 0;
};

export const increaseIncorrectAnswers = (
  currentIncorrectAnswers: number
): number => {
  return currentIncorrectAnswers + 1;
};

export const increaseCorrectAnswers = (
  currentCorrectAnswers: number
): number => {
  return currentCorrectAnswers + 1;
};

export const manageUsedWildCards = (
  action: "increase" | "reset",
  currentUsedWildCards: number
): number => {
  if (action === "increase") return currentUsedWildCards + 1;
  return 0;
};

export const increaseSelectedAnswers = (
  currentSelectedAnswers: number
): number => {
  return currentSelectedAnswers + 1;
};

export const validateIsNewAttempt = (
  match: Pick<Match, "isNewAttempt" | "currentQuestion">
): number => {
  const { isNewAttempt, currentQuestion } = match;
  const newReward: number = isNewAttempt ? 0 : currentQuestion.reward;
  return newReward;
};

export const validateDividedWildCard = (
  currentIncorrectAnswers: number,
  match: Pick<Match, "selectedAnswers" | "isDividedWildCardActive">
): number => {
  const { selectedAnswers, isDividedWildCardActive } = match;
  const newIncorrectAnswers: number = isDividedWildCardActive
    ? selectedAnswers <= 1
      ? 0
      : increaseIncorrectAnswers(currentIncorrectAnswers)
    : increaseIncorrectAnswers(currentIncorrectAnswers);
  return newIncorrectAnswers;
};

export const updateMatchesGameState = (
  matches: Match[] | undefined,
  currentMatchId: string,
  updatedMath: Partial<Match>
): Match[] => {
  const updatedMatches: Match[] = matches?.map((match) => {
    if (match.id === currentMatchId)
      return { ...match, ...updatedMath } as Match;
    return match;
  }) as Match[];

  return updatedMatches;
};

export const getDifficultyBadgeVariant = (
  difficulty: Difficulty
): ButtonVariantType => {
  const variant: ButtonVariantType =
    difficulty === "Basico"
      ? "success"
      : difficulty === "Intermedio"
      ? "warning"
      : "danger";

  return variant;
};

export const getDifficultyBadgeIcon = (difficulty: Difficulty): IconType => {
  const Icon: IconType =
    difficulty === "Basico"
      ? Emoji
      : difficulty === "Intermedio"
      ? EmojiQuite
      : EmojiSurprise;
  return Icon;
};

const getSelectedSingleAnswerStyle = (matchResult: MatchResultType) => {
  const selectedAnwerStyle: AnswerOptionStyleProps =
    matchResult === "Correcta"
      ? {
          background: "var(--green)",
          color: "var(--gray)",
          bordercolor: "var(--white)",
        }
      : matchResult === "Incorrecta"
      ? {
          background: "var(--red)",
          color: "var(--white)",
          bordercolor: "var(--white)",
        }
      : {
          background: "var(--primary-color-100)",
          color: "var(--gray)",
          bordercolor: "var(--primary-color-base)",
        };
  return selectedAnwerStyle;
};

export const getSelectedAnswerStyle = (
  id: number,
  answerStyles: AnswerOptionStyleProps[],
  matchResult: MatchResultType
): AnswerOptionStyleProps[] => {
  const updatedAnswerStyles: AnswerOptionStyleProps[] = answerStyles.map(
    (answerStyle, index) => {
      if (id === index) return getSelectedSingleAnswerStyle(matchResult);
      return answerStyle;
    }
  );

  return updatedAnswerStyles;
};

export const getAnswerResultTitle = (matchResult: MatchResultType): string => {
  const title: string =
    matchResult === "Correcta"
      ? "¡Respuesta Correcta!"
      : matchResult === "Incorrecta"
      ? "¡Respuesta Incorrecta!"
      : " ¡Se te acabo el tiempo!";
  return title;
};

export const getAnswerResultTitleColor = (
  matchResult: MatchResultType
): string => {
  const color: string =
    matchResult === "Correcta"
      ? "var(--green)"
      : matchResult === "Incorrecta"
      ? "var(--red)"
      : "var(--orange)";
  return color;
};

export const getAnswerResultMessage = (
  game: Game | null,
  currentMatch: Match
): string => {
  const message: string =
    game &&
    currentMatch?.matchResult === "Correcta" &&
    parseInt(String(game.incorrectAnswers)) === 0
      ? `+ $${currentMatch?.currentQuestion?.reward}`
      : game &&
        game.incorrectAnswers > 0 &&
        currentMatch?.matchResult === "Correcta" &&
        !currentMatch?.isDividedWildCardActive
      ? "¡Continua con el juego!"
      : currentMatch?.matchResult === "Incorrecta" ||
        currentMatch?.matchResult === "SinResponderRetirado"
      ? "¡Ganancia Acumulada!-retirado"
      : "";
  return message;
};

export const getUpdatedGamesState = (
  currentGames: Game[],
  updatedGame: Game
): Game[] => {
  const updatedGames: Game[] = currentGames.map((game) => {
    if (game.id === updatedGame.id) return updatedGame;
    return game;
  });
  return updatedGames;
};

export const validateDividedSelectedAnswers = (
  currentMatch: Match,
  matchResult: MatchResultType
): boolean => {
  const willCardActive: boolean = currentMatch?.isDividedWildCardActive
    ? currentMatch?.selectedAnswers <= 2 && matchResult === "Incorrecta"
    : false;
  return willCardActive;
};
