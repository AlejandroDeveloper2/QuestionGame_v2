import { Loading } from "@core/types/data-types";
import { Auth, Player, StartFormData, AuthStatusType } from "./data-types";

interface AuthStore {
  authData: Auth;
  player: Player;
  authStatus: AuthStatusType;
  login: (
    userCredentials: LoginFormData,
    toggleLoading: (loadingStatus: Loading) => void
  ) => Promise<void>;
  refreshUserAuth: (
    toggleLoading: (loadingStatus: Loading) => void
  ) => Promise<void>;
  logout: () => void;
  authenticatePlayer: (
    playerInfo: StartFormData,
    toggleLoading: (loadingStatus: Loading) => void
  ) => Promise<void>;
  clearPlayer: (playerId: string) => Promise<void>;
  getPlayer: (quizId: string) => Promise<void>;
}

export type { AuthStore };
