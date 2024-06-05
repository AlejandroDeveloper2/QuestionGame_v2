import { Answer } from "@admin/types/data-types";
import { FieldErrorType, WrongInput } from "@core/types/data-types";

import { Validations } from "@core/utils";

const validations = new Validations();

export const validationSchema = async (
  formData: Answer,
  formRef: React.RefObject<HTMLFormElement>
): Promise<WrongInput<keyof Answer>> => ({
  answerText: await validations
    .validateEmptyFields<Answer>(formData.answerText, "answerText", formRef)
    .catch((error: FieldErrorType) => error),
  isCorrectAnswer: await validations
    .validateEmptyFields<Answer>(
      String(formData.isCorrectAnswer),
      "isCorrectAnswer",
      formRef
    )
    .catch((error: FieldErrorType) => error),
});
