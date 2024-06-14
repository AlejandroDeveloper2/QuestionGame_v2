import {
  Auth,
  LoginFormData,
  Player,
  StartFormData,
} from "@auth/types/data-types";
import { ServerResponse } from "@core/types/data-types";

import { client } from "@config/pocketbase";

class AuthService {
  constructor() {}
  public async login(userCredentials: LoginFormData): Promise<Auth> {
    let result: Auth;
    try {
      result = await client
        .collection<Auth>("users")
        .authWithPassword(userCredentials.username, userCredentials.password);
    } catch (e: unknown) {
      const parsedError = e as ServerResponse;
      throw new Error(
        (parsedError.message = "¡Credenciales invalidas, por favor verifique!")
      );
    }
    return result;
  }

  public async refreshUserAuth(): Promise<Auth> {
    let result: Auth;
    try {
      result = await client.collection<Auth>("users").authRefresh();
    } catch (e: unknown) {
      const parsedError = e as ServerResponse;
      throw new Error(
        (parsedError.message =
          parsedError.code === 404
            ? "¡Recurso no encontrado!"
            : "¡Usuario no logueado!")
      );
    }
    return result;
  }

  public logout(): void {
    client.authStore.clear();
  }

  public async authenticatePlayer(playerInfo: StartFormData): Promise<Player> {
    let result: Player;
    try {
      result = await client.collection<Player>("players").create(playerInfo);
    } catch (e: unknown) {
      const parsedError = e as ServerResponse;
      throw new Error(
        (parsedError.message =
          "¡Codigo de quiz erroneo o Ha ocurrido un error al crear el jugador!")
      );
    }
    return result;
  }

  public async clearPlayer(playerId: string): Promise<void> {
    try {
      await client.collection("players").delete(playerId);
    } catch (e: unknown) {
      const parsedError = e as ServerResponse;
      throw new Error(
        (parsedError.message =
          "¡Ha ocurrido un error al eliminar a el jugador!")
      );
    }
  }

  public async getPlayer(quizId: string): Promise<Player> {
    let result: Player;
    try {
      result = await client
        .collection("players")
        .getFirstListItem<Player>(`quizCode="${quizId}"`, { requestKey: null });
    } catch (e: unknown) {
      const parsedError = e as ServerResponse;
      throw new Error(
        (parsedError.message = "¡Ha ocurrido un error al obtener el jugador!")
      );
    }
    return result;
  }
}

export default AuthService;
