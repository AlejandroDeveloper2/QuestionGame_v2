import { Answer } from "@admin/types/data-types";

import { WrongInput } from "@core/types/data-types";

export const initialAnswerValues: Answer = {
  answerText: "",
  isCorrectAnswer: false,
};

export const initialAnswerErrors: WrongInput<keyof Answer> = {
  answerText: {
    message: "",
    error: false,
  },
  isCorrectAnswer: {
    message: "",
    error: false,
  },
};
