import { LoginFormData } from "@auth/types/data-types";
import { FieldErrorType, WrongInput } from "@core/types/data-types";

import { Validations } from "@core/utils";

const validations = new Validations();

export const validationSchema = async (
  formData: LoginFormData,
  formRef: React.RefObject<HTMLFormElement>
): Promise<WrongInput<keyof LoginFormData>> => ({
  username: await validations
    .validateEmptyFields<LoginFormData>(formData.username, "username", formRef)
    .then(() =>
      validations.validateUsername<LoginFormData>(
        formData.username,
        "username",
        formRef
      )
    )
    .catch((error: FieldErrorType) => error),
  password: await validations
    .validateEmptyFields<LoginFormData>(formData.password, "password", formRef)
    // .then((wrongInput) => wrongInput)
    .catch((error: FieldErrorType) => error),
});
