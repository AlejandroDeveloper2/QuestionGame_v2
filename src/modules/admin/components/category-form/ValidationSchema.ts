import { CategoryFormData } from "@admin/types/data-types";
import { FieldErrorType, WrongInput } from "@core/types/data-types";

import { Validations } from "@core/utils";

const validations = new Validations();

export const validationSchema = async (
  formData: CategoryFormData,
  formRef: React.RefObject<HTMLFormElement>
): Promise<WrongInput<keyof CategoryFormData>> => ({
  name: await validations
    .validateEmptyFields<CategoryFormData>(formData.name, "name", formRef)
    .catch((error: FieldErrorType) => error),
});
