import { ConsolationAwardFormData } from "@admin/types/data-types";
import { FieldErrorType, WrongInput } from "@core/types/data-types";

import { Validations } from "@core/utils";

const validations = new Validations();

export const validationSchema = async (
  formData: ConsolationAwardFormData,
  formRef: React.RefObject<HTMLFormElement>
): Promise<WrongInput<keyof ConsolationAwardFormData>> => ({
  consolationAward: await validations
    .validateEmptyFields<ConsolationAwardFormData>(
      formData.consolationAward,
      "consolationAward",
      formRef
    )
    .then(() =>
      validations.validateNumericFields<ConsolationAwardFormData>(
        window.parseInt(formData.consolationAward),
        "consolationAward",
        formRef
      )
    )
    .catch((error: FieldErrorType) => error),
});
