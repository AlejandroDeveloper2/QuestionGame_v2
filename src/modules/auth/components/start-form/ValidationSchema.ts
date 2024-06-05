import { StartFormData } from "@auth/types/data-types";
import { FieldErrorType, WrongInput } from "@core/types/data-types";

import { Validations } from "@core/utils";

const validations = new Validations();

export const validationSchema = async (
  formData: StartFormData,
  formRef: React.RefObject<HTMLFormElement>
): Promise<WrongInput<keyof StartFormData>> => ({
  username: await validations
    .validateEmptyFields<StartFormData>(formData.username, "username", formRef)
    .then(() =>
      validations.validateUsername<StartFormData>(
        formData.username,
        "username",
        formRef
      )
    )
    .catch((error: FieldErrorType) => error),
  quizCode: await validations
    .validateEmptyFields<StartFormData>(formData.quizCode, "quizCode", formRef)
    .catch((error: FieldErrorType) => error),
});
