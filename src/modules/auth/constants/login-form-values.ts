import { LoginFormData } from "@auth/types/data-types";

import { WrongInput } from "@core/types/data-types";

export const initialLoginValues: LoginFormData = {
  username: "",
  password: "",
};

export const initialLoginErrors: WrongInput<keyof LoginFormData> = {
  username: {
    message: "",
    error: false,
  },
  password: {
    message: "",
    error: false,
  },
};
