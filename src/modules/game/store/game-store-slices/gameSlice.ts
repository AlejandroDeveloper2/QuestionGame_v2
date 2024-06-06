import { StateCreator } from "zustand";
import { toast } from "react-toastify";

import { GameSlice, MatchSlice } from "@game/types/store-types";
import { Game } from "@game/types/data-types";
import { Loading, ServerResponse } from "@core/types/data-types";

import { gameInitialValues, initialMatchData } from "@game/constants";

import { createMatches } from "@game/utils";
import { GameService } from "@game/services";
import {
  getUpdatedGamesState,
  increaseMatchIndex,
  updateMatchesGameState,
  // updateMatchesGameState,
} from "@game/helpers";

const gameService = new GameService();

const createGameSlice: StateCreator<
  GameSlice & MatchSlice,
  [],
  [],
  GameSlice
> = (set, get) => ({
  games: [],
  game: null,
  setGames: (games): void => {
    set({ games });
  },
  createGame: async (gameData, quizId, quizQuestions): Promise<void> => {
    try {
      const newGame: Game = await gameService.createGame({
        ...gameData,
        quizId,
        matches: createMatches(quizQuestions),
      });
      set(({ games }) => ({ games: [...games, newGame], game: newGame }));
      toast.success("¡Juego creado!");
    } catch (_e: unknown) {
      const parsedError = _e as ServerResponse;
      toast.error(parsedError.message);
    }
  },
  getAllGames: async (): Promise<void> => {
    try {
      const games: Game[] = await gameService.getAllGames();
      set({ games });
    } catch (_e: unknown) {
      const parsedError = _e as ServerResponse;
      toast.error(parsedError.message);
    }
  },
  getGame: async (quizId): Promise<void> => {
    try {
      const game: Game = await gameService.getGame(quizId);
      set({ game, currentMatch: game.matches[game.currentMatchIndex] });
    } catch (_e: unknown) {
      set({ game: null, currentMatch: initialMatchData });
      const parsedError = _e as ServerResponse;
      console.log(parsedError);
    }
  },
  resetGame: async (gameId, quizId, quizQuestions): Promise<void> => {
    try {
      const updatedGame: Game = await gameService.updateGameStatus(
        gameId,
        {
          ...gameInitialValues,
          id: gameId,
          quizId,
          matches: createMatches(quizQuestions),
        },
        "¡Ha ocurrido un error al resetear el juego!"
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
  updateGameStatictis: async (gameId, gameStatistics): Promise<void> => {
    try {
      const updatedGame: Game = await gameService.updateGameStatus(
        gameId,
        gameStatistics,
        "¡Ha ocurrido un error al actualizar las estadisticas del juego!"
      );
      set(({ games }) => ({
        games: getUpdatedGamesState(games, updatedGame),
      }));
    } catch (_e: unknown) {
      const parsedError = _e as ServerResponse;
      toast.error(parsedError.message);
    }
  },

  nextMatch: async (
    gameId,
    game,
    toggleLoading: (loading: Loading) => void
  ): Promise<void> => {
    toggleLoading({ isLoading: true, message: "Continuando..." });
    try {
      const isDividedWildCardActive: boolean =
        get().currentMatch.isDividedWildCardActive;
      const matchResult = get().currentMatch.matchResult;
      if (
        (isDividedWildCardActive && matchResult === "Correcta") ||
        matchResult === "Correcta"
      ) {
        const updatedGame: Game = await gameService.updateGameStatus(
          gameId,
          {
            currentMatchIndex: increaseMatchIndex(game.currentMatchIndex),
            matches: updateMatchesGameState(
              game.matches,
              game.matches[increaseMatchIndex(game.currentMatchIndex)].id,
              {
                isMatchPaused: false,
                isDividedWildCardActive: false,
                isNewAttempt: false,
              }
            ),
            incorrectAnswers: 0,
          },
          "¡Ha ocurrido un error al continuar con la siguiente ronda!"
        );
        set(({ games }) => ({
          games: getUpdatedGamesState(games, updatedGame),
          currentMatch: updatedGame.matches[updatedGame.currentMatchIndex],
        }));
      }
    } catch (_e: unknown) {
      const parsedError = _e as ServerResponse;
      toast.error(parsedError.message);
    } finally {
      toggleLoading({ isLoading: false, message: "" });
    }
  },

  deleteGame: async (gameId: string): Promise<void> => {
    try {
      await gameService.deleteGame(gameId);
      set(({ games }) => ({
        games: games.filter((game) => game.id !== gameId),
      }));
    } catch (_e: unknown) {
      const parsedError = _e as ServerResponse;
      toast.error(parsedError.message);
    }
  },
});

export default createGameSlice;
