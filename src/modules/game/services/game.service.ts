import { Game, GameFormData } from "@game/types/data-types";
import { ServerResponse } from "@core/types/data-types";

import { client } from "@config/pocketbase";

class GameService {
  constructor() {}

  public async createGame(gameData: GameFormData): Promise<Game> {
    let result: Game;
    try {
      result = await client
        .collection<Game>("game_v2")
        .create(gameData, { requestKey: null });
    } catch (e: unknown) {
      const parsedError = e as ServerResponse;
      throw new Error(
        (parsedError.message = "¡Ha ocurrido un error al crear el juego!")
      );
    }
    return result;
  }

  public async getAllGames(): Promise<Game[]> {
    let result: Game[];
    try {
      result = await client
        .collection<Game[]>("game_v2")
        .getFullList({ requestKey: "" });
    } catch (e: unknown) {
      const parsedError = e as ServerResponse;
      throw new Error(
        (parsedError.message = "¡Ha ocurrido un error al obtener los juegos!")
      );
    }
    return result;
  }

  public async getGame(quizId: string): Promise<Game> {
    let result: Game;
    try {
      result = await client
        .collection<Game>("game_v2")
        .getFirstListItem(`quizId="${quizId}"`, { requestKey: null });
    } catch (e: unknown) {
      const parsedError = e as ServerResponse;
      throw new Error(
        (parsedError.message = "¡Ha ocurrido un error al obtener el juego!")
      );
    }
    return result;
  }

  public async updateGameStatus(
    gameId: string,
    gamePartData: Partial<Game>,
    errorMessage: string
  ): Promise<Game> {
    let result: Game;
    try {
      result = await client
        .collection<Game>("game_v2")
        .update(gameId, gamePartData);
    } catch (e: unknown) {
      const parsedError = e as ServerResponse;
      throw new Error((parsedError.message = errorMessage));
    }
    return result;
  }

  public async deleteGame(gameId: string): Promise<void> {
    try {
      await client.collection("game_v2").delete(gameId, { requestKey: null });
    } catch (e: unknown) {
      const parsedError = e as ServerResponse;
      throw new Error(
        (parsedError.message = "¡Ha ocurrido un error al eliminar el juego!")
      );
    }
  }
}

export default GameService;
