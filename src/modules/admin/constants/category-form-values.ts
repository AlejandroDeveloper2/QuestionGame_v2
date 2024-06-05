import { CategoryFormData } from "@admin/types/data-types";

import { WrongInput } from "@core/types/data-types";

export const initialCategoryValues: CategoryFormData = {
  name: "",
};

export const initialCategoryErrors: WrongInput<keyof CategoryFormData> = {
  name: {
    message: "",
    error: false,
  },
};
