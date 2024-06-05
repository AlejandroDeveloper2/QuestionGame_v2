import { create } from "zustand";
import { toast } from "react-toastify";

import { AuthStore } from "@auth/types/store-types";
import {
  Auth,
  LoginFormData,
  Player,
  StartFormData,
} from "@auth/types/data-types";
import { Loading, ServerResponse } from "@core/types/data-types";

import { client } from "@config/pocketbase";
import { AuthService } from "@auth/services";
import { quizAdminStore } from "@admin/store";

const authService = new AuthService();

const authStore = create<AuthStore>((set) => ({
  authData: {
    token: null,
    record: {
      username: "",
      email: "",
    },
  },
  player: {
    id: "",
    username: "",
    quizCode: "",
  },
  authStatus: "not-authenticated",
  login: async (
    userCredentials: LoginFormData,
    toggleLoading: (loadingStatus: Loading) => void
  ): Promise<void> => {
    toggleLoading({ isLoading: true, message: "Validando usuario..." });
    try {
      const authData: Auth = await authService.login(userCredentials);
      set({ authData });
      if (client.authStore.isValid) {
        set({ authStatus: "authenticated" });
        toast.success("Inicio de sesión correcto!");
      }
    } catch (_e: unknown) {
      const parsedError = _e as ServerResponse;
      toast.error(parsedError.message);
    } finally {
      toggleLoading({ isLoading: false, message: "" });
    }
  },
  refreshUserAuth: async (
    toggleLoading: (loadingStatus: Loading) => void
  ): Promise<void> => {
    toggleLoading({ isLoading: true, message: "Validando sesión..." });
    set({ authStatus: "checking" });
    try {
      const authData: Auth = await authService.refreshUserAuth();
      set({ authData });
      set({
        authStatus: client.authStore.isValid
          ? "authenticated"
          : "not-authenticated",
      });
    } catch (_e: unknown) {
      const parsedError = _e as ServerResponse;
      console.log(parsedError.message);
      set({ authStatus: "not-authenticated" });
    } finally {
      toggleLoading({ isLoading: false, message: "" });
    }
  },
  logout: (): void => {
    authService.logout();
    set({
      authData: {
        token: client.authStore.token,
        record: {
          username: "",
          email: "",
        },
      },
      authStatus: "not-authenticated",
    });
  },
  authenticatePlayer: async (
    playerInfo: StartFormData,
    toggleLoading: (loadingStatus: Loading) => void
  ): Promise<void> => {
    toggleLoading({ isLoading: true, message: "Guardando jugador..." });
    try {
      await quizAdminStore.getState().getQuiz(playerInfo.quizCode);
      const quiz = quizAdminStore.getState().quiz;

      if (quiz) {
        const player = await authService.authenticatePlayer(playerInfo);
        set({ player });
      }
    } catch (_e: unknown) {
      const parsedError = _e as ServerResponse;
      toast.error(parsedError.message);
    } finally {
      toggleLoading({ isLoading: false, message: "" });
    }
  },
  clearPlayer: async (playerId: string): Promise<void> => {
    try {
      await authService.clearPlayer(playerId);
      set({
        player: {
          id: "",
          username: "",
          quizCode: "",
        },
      });
    } catch (_e: unknown) {
      const parsedError = _e as ServerResponse;
      toast.error(parsedError.message);
    }
  },
  getPlayer: async (quizId: string): Promise<void> => {
    try {
      const player: Player = await authService.getPlayer(quizId);
      set({ player });
    } catch (_e: unknown) {
      const parsedError = _e as ServerResponse;
      set({
        player: {
          id: "",
          username: "",
          quizCode: "",
        },
      });
      toast.error(parsedError.message);
    }
  },
}));

export default authStore;
