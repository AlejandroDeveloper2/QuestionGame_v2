type AuthStatusType = "checking" | "not-authenticated" | "authenticated";

interface StartFormData {
  username: string;
  quizCode: string;
}

interface LoginFormData {
  username: string;
  password: string;
}

interface Auth {
  token: string | null;
  record: {
    username: string;
    email: string;
  };
}

interface Player extends StartFormData {
  id: string;
}

export type { AuthStatusType, StartFormData, LoginFormData, Auth, Player };
