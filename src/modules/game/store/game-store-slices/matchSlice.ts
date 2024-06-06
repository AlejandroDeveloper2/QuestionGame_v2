import { StateCreator } from "zustand";
import { toast } from "react-toastify";

import { GameSlice, MatchSlice } from "@game/types/store-types";
import { Game, Match, MatchResultType } from "@game/types/data-types";
import { Loading, ServerResponse } from "@core/types/data-types";
import { Question } from "@admin/types/data-types";

import { answerStyleData, initialMatchData } from "@game/constants";

import {
  getSelectedAnswerStyle,
  getUpdatedGamesState,
  increaseSelectedAnswers,
  manageUsedWildCards,
  updateMatchesGameState,
  validateDividedSelectedAnswers,
} from "@game/helpers";
import { answerQuestion, getGameStatus, giveNewAttempt } from "@game/utils";

import { GameService } from "@game/services";

const gameService = new GameService();

const createMatchSlice: StateCreator<
  GameSlice & MatchSlice,
  [],
  [],
  MatchSlice
> = (set, get) => ({
  currentMatch: initialMatchData,
  selectAnswer: async (
    gameId,
    answerId,
    game: Game,
    selectedAnswer,
    toggleLoading: (loading: Loading) => void
  ): Promise<void> => {
    toggleLoading({ isLoading: true, message: "Seleccionando respuesta..." });
    try {
      const currentSelectedAnswers: number = get().currentMatch.selectedAnswers;
      const currentQuestion: Question = get().currentMatch.currentQuestion;
      const matchResult: MatchResultType = answerQuestion(
        currentQuestion,
        selectedAnswer
      );
      const updatedCurrentMatch: Match = {
        ...get().currentMatch,
        matchResult,
        answerStyles: getSelectedAnswerStyle(
          answerId,
          get().currentMatch.answerStyles,
          matchResult
        ),
        isMatchPaused: true,
        isDividedWildCardActive: validateDividedSelectedAnswers(
          get().currentMatch,
          matchResult
        ),
        selectedAnswers: get().currentMatch.isDividedWildCardActive
          ? increaseSelectedAnswers(currentSelectedAnswers)
          : 0,
      };

      const updatedGame = getGameStatus(game, updatedCurrentMatch);

      const updatedMatches: Match[] = updateMatchesGameState(
        game.matches,
        get().currentMatch.id,
        updatedCurrentMatch
      );

      const newGame: Game = await gameService.updateGameStatus(
        gameId,
        { ...updatedGame, matches: updatedMatches },
        "¡Ha ocurrido un error al seleccionar la respuesta!"
      );

      set(({ games }) => ({
        games: getUpdatedGamesState(games, newGame),
        currentMatch: newGame.matches[newGame.currentMatchIndex],
      }));

      if (selectedAnswer) toast.success("¡Opción seleccionada!");
    } catch (_e: unknown) {
      const parsedError = _e as ServerResponse;
      toast.error(parsedError.message);
    } finally {
      toggleLoading({ isLoading: false, message: "" });
    }
  },
  pauseMatch: async (
    gameId,
    game: Game,
    toggleLoading: (loading: Loading) => void
  ): Promise<void> => {
    toggleLoading({ isLoading: true, message: "Pausando ronda..." });
    try {
      const updatedMatches: Match[] = updateMatchesGameState(
        game.matches,
        get().currentMatch.id,
        { isMatchPaused: true }
      );

      const updatedGame: Game = await gameService.updateGameStatus(
        gameId,
        { matches: updatedMatches },
        "¡Ha ocurrido un error al pausar la ronda!"
      );
      set(({ games }) => ({
        games: getUpdatedGamesState(games, updatedGame),
        currentMatch: updatedGame.matches[updatedGame.currentMatchIndex],
      }));
    } catch (_e: unknown) {
      const parsedError = _e as ServerResponse;
      toast.error(parsedError.message);
    } finally {
      toggleLoading({ isLoading: false, message: "" });
    }
  },
  startMatch: async (
    gameId,
    game: Game,
    toggleLoading: (loading: Loading) => void
  ): Promise<void> => {
    toggleLoading({ isLoading: true, message: "Iniciando ronda..." });
    try {
      const updatedMatches: Match[] = updateMatchesGameState(
        game.matches,
        get().currentMatch.id,
        { isMatchPaused: false }
      );

      const updatedGame: Game = await gameService.updateGameStatus(
        gameId,
        { matches: updatedMatches },
        "¡Ha ocurrido un error al iniciar la ronda!"
      );

      set(({ games }) => ({
        games: getUpdatedGamesState(games, updatedGame),
        currentMatch: updatedGame.matches[updatedGame.currentMatchIndex],
      }));
    } catch (_e: unknown) {
      const parsedError = _e as ServerResponse;
      toast.error(parsedError.message);
    } finally {
      toggleLoading({ isLoading: false, message: "" });
    }
  },
  restartMatch: async (
    gameId,
    game: Game,
    toggleLoading: (loading: Loading) => void
  ): Promise<void> => {
    toggleLoading({ isLoading: true, message: "Reiniciando ronda..." });
    try {
      const timerValue: number = get().currentMatch.currentQuestion.time;

      const updatedMatches: Match[] = updateMatchesGameState(
        game.matches,
        get().currentMatch.id,
        {
          matchResult: "EnEspera",
          timerValue,
          selectedAnswers: 0,
          isMatchPaused: true,
          isCallWildCardActive: false,
          isDividedWildCardActive: false,
          isNewAttempt: false,
        }
      );

      const updatedGame: Game = await gameService.updateGameStatus(
        gameId,
        { matches: updatedMatches },
        "¡Ha ocurrido un error al reiniciar la ronda!"
      );
      set(({ games }) => ({
        games: getUpdatedGamesState(games, updatedGame),
        currentMatch: updatedGame.matches[updatedGame.currentMatchIndex],
      }));
    } catch (_e: unknown) {
      const parsedError = _e as ServerResponse;
      toast.error(parsedError.message);
    } finally {
      toggleLoading({ isLoading: false, message: "" });
    }
  },
  spendWildCard: async (gameId, game, wildCard): Promise<void> => {
    try {
      const updatedMatches: Match[] = updateMatchesGameState(
        game.matches,
        get().currentMatch.id,
        {
          matchResult: "EnEspera",
          isMatchPaused: true,
          isCallWildCardActive: wildCard === "call",
          isDividedWildCardActive: wildCard === "divided",
        }
      );

      const currentUsedWildCards: number = game.usedWildcards;

      const updatedGame: Game = await gameService.updateGameStatus(
        gameId,
        {
          matches: updatedMatches,
          usedWildcards: manageUsedWildCards("increase", currentUsedWildCards),
        },
        "¡Ha ocurrido un error al usar el comodin!"
      );

      set(({ games }) => ({
        games: getUpdatedGamesState(games, updatedGame),
        currentMatch: updatedGame.matches[updatedGame.currentMatchIndex],
      }));
    } catch (_e: unknown) {
      const parsedError = _e as ServerResponse;
      toast.error(parsedError.message);
    }
  },
  inactivateWildCard: async (gameId, game): Promise<void> => {
    try {
      const updatedMatches: Match[] = updateMatchesGameState(
        game.matches,
        get().currentMatch.id,
        {
          selectedAnswers: 0,
          isCallWildCardActive: false,
          isDividedWildCardActive: false,
        }
      );

      const currentUsedWildCards: number = game.usedWildcards;

      const updatedGame: Game = await gameService.updateGameStatus(
        gameId,
        {
          matches: updatedMatches,
          usedWildcards: manageUsedWildCards("increase", currentUsedWildCards),
        },
        "¡Ha ocurrido un error al desactivar el comodin!"
      );

      set(({ games }) => ({
        games: getUpdatedGamesState(games, updatedGame),
        currentMatch: updatedGame.matches[updatedGame.currentMatchIndex],
      }));
    } catch (_e: unknown) {
      const parsedError = _e as ServerResponse;
      toast.error(parsedError.message);
    }
  },
  giveNewAttempt: async (
    gameId,
    game,
    questionBank,
    quizQuestions,
    toggleLoading: (loading: Loading) => void
  ): Promise<void> => {
    toggleLoading({
      isLoading: true,
      message: "Concediendo nueva oportunidad...",
    });
    try {
      const updatedMatches: Match[] = updateMatchesGameState(
        game.matches,
        get().currentMatch.id,
        {
          matchResult: "EnEspera",
          isMatchPaused: true,
          isNewAttempt: true,
          currentQuestion: giveNewAttempt(questionBank, quizQuestions),
          answerStyles: answerStyleData,
        }
      );

      const updatedGame: Game = await gameService.updateGameStatus(
        gameId,
        {
          matches: updatedMatches,
        },
        "¡Ha ocurrido un error al conceder nuevo intento!"
      );

      set(({ games }) => ({
        games: getUpdatedGamesState(games, updatedGame),
        currentMatch: updatedGame.matches[updatedGame.currentMatchIndex],
      }));
    } catch (_e: unknown) {
      const parsedError = _e as ServerResponse;
      toast.error(parsedError.message);
    } finally {
      toggleLoading({ isLoading: false, message: "" });
    }
  },
  exitMatch: async (
    gameId,
    game,
    toggleLoading: (loading: Loading) => void
  ): Promise<void> => {
    toggleLoading({ isLoading: true, message: "Finalizando ronda..." });
    try {
      const updatedMatches: Match[] = updateMatchesGameState(
        game.matches,
        get().currentMatch.id,
        { matchResult: "SinResponderRetirado" }
      );

      const updatedGame: Game = await gameService.updateGameStatus(
        gameId,
        { matches: updatedMatches },
        "¡Ha ocurrido un error al finalizar la ronda!"
      );

      set(({ games }) => ({
        games: getUpdatedGamesState(games, updatedGame),
        currentMatch: updatedGame.matches[updatedGame.currentMatchIndex],
      }));
    } catch (_e: unknown) {
      const parsedError = _e as ServerResponse;
      toast.error(parsedError.message);
    } finally {
      toggleLoading({ isLoading: false, message: "" });
    }
  },
});

export default createMatchSlice;
