import { Answer, QuestionFormData } from "@admin/types/data-types";
import { FieldErrorType, WrongInput } from "@core/types/data-types";

import { Validations } from "@core/utils";

const validations = new Validations();

export const validationSchema = async (
  formData: QuestionFormData,
  formRef: React.RefObject<HTMLFormElement>
): Promise<WrongInput<keyof QuestionFormData>> => ({
  name: await validations
    .validateEmptyFields<QuestionFormData>(formData.name, "name", formRef)
    .catch((error: FieldErrorType) => error),
  questionBody: await validations
    .validateEmptyFields<QuestionFormData>(
      formData.questionBody,
      "questionBody",
      formRef
    )
    .catch((error: FieldErrorType) => error),
  answers: await validations
    .validateOptionsLength<QuestionFormData, Answer>(
      formData.answers,
      "answers",
      4,
      formRef
    )
    .then(() =>
      validations.validateOptions<Answer, boolean>(
        formData.answers,
        "isCorrectAnswer",
        1,
        true,
        "¡Solo debe haber una respuesta correcta!",
        formRef
      )
    )
    .catch((error: FieldErrorType) => error),
  time: await validations
    .validateEmptyFields<QuestionFormData>(formData.time, "time", formRef)
    .then(() =>
      validations.validateNumericFields<QuestionFormData>(
        formData.time,
        "time",
        formRef
      )
    )
    .catch((error: FieldErrorType) => error),
  reward: await validations
    .validateEmptyFields<QuestionFormData>(formData.reward, "reward", formRef)
    .then(() =>
      validations.validateNumericFields<QuestionFormData>(
        formData.reward,
        "reward",
        formRef
      )
    )
    .catch((error: FieldErrorType) => error),
  category: await validations
    .validateEmptyFields<QuestionFormData>(
      formData.category,
      "category",
      formRef
    )
    .catch((error: FieldErrorType) => error),
  difficulty: await validations
    .validateEmptyFields<QuestionFormData>(
      formData.difficulty,
      "difficulty",
      formRef
    )
    .catch((error: FieldErrorType) => error),
});
