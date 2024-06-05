import { StartFormData } from "@auth/types/data-types";

import { WrongInput } from "@core/types/data-types";

export const initialStartValues: StartFormData = {
  username: "",
  quizCode: "",
};

export const initialStartErrors: WrongInput<keyof StartFormData> = {
  username: {
    message: "",
    error: false,
  },
  quizCode: {
    message: "",
    error: false,
  },
};
