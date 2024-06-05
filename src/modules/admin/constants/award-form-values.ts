import { ConsolationAwardFormData } from "@admin/types/data-types";

import { WrongInput } from "@core/types/data-types";

export const initialAwardValues: ConsolationAwardFormData = {
  consolationAward: "",
};

export const initialAwardErrors: WrongInput<keyof ConsolationAwardFormData> = {
  consolationAward: {
    message: "",
    error: false,
  },
};
