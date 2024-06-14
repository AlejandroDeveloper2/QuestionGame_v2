import { Category, QuizFormData } from "@admin/types/data-types";
import { FieldErrorType, WrongInput } from "@core/types/data-types";

import { Validations } from "@core/utils";

const validations = new Validations();

export const validationSchema = async (
  formData: QuizFormData,
  formRef: React.RefObject<HTMLFormElement>
): Promise<WrongInput<keyof QuizFormData>> => ({
  name: await validations
    .validateEmptyFields<QuizFormData>(formData.name, "name", formRef)
    .catch((error: FieldErrorType) => error),
  categories: await validations
    .validateEmptyList<QuizFormData, Category>(
      formData.categories,
      "categories",
      formRef
    )
    .catch((error: FieldErrorType) => error),
  easyQuestions: await validations
    .validateEmptyFields<QuizFormData>(
      formData.easyQuestions,
      "easyQuestions",
      formRef
    )
    .then(() =>
      validations.validateNumericFields<QuizFormData>(
        formData.easyQuestions,
        "easyQuestions",
        formRef
      )
    )
    .catch((error: FieldErrorType) => error),

  mediumQuestions: await validations
    .validateEmptyFields<QuizFormData>(
      formData.mediumQuestions,
      "mediumQuestions",
      formRef
    )
    .then(() =>
      validations.validateNumericFields<QuizFormData>(
        formData.mediumQuestions,
        "mediumQuestions",
        formRef
      )
    )
    .catch((error: FieldErrorType) => error),
  expertQuestions: await validations
    .validateEmptyFields<QuizFormData>(
      formData.expertQuestions,
      "expertQuestions",
      formRef
    )
    .catch((error: FieldErrorType) => error),
});
