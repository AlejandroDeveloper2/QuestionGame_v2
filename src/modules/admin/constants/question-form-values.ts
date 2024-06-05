import { QuestionFormData } from "@admin/types/data-types";

import { WrongInput } from "@core/types/data-types";

export const initialQuestionValues: QuestionFormData = {
  name: "",
  questionBody: "",
  answers: [],
  time: 0,
  reward: 0,
  category: "",
  difficulty: "Basico",
};

export const initialQuestionErrors: WrongInput<keyof QuestionFormData> = {
  name: {
    message: "",
    error: false,
  },
  time: {
    message: "",
    error: false,
  },
  questionBody: {
    message: "",
    error: false,
  },
  answers: {
    message: "",
    error: false,
  },
  reward: {
    message: "",
    error: false,
  },
  category: {
    message: "",
    error: false,
  },
  difficulty: {
    message: "",
    error: false,
  },
};
