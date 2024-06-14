import { QuizFormData } from "@admin/types/data-types";
import { WrongInput } from "@core/types/data-types";

export const preConfiguredQuizData: QuizFormData = {
  name: "Quiz 1",
  categories: [],
  easyQuestions: 5,
  mediumQuestions: 5,
  expertQuestions: 46,
};

export const initialQuizValues: QuizFormData = {
  name: "",
  categories: [],
  easyQuestions: 0,
  mediumQuestions: 0,
  expertQuestions: 0,
};

export const initialQuizErrors: WrongInput<keyof QuizFormData> = {
  name: {
    message: "",
    error: false,
  },
  categories: {
    message: "",
    error: false,
  },
  easyQuestions: {
    message: "",
    error: false,
  },
  mediumQuestions: {
    message: "",
    error: false,
  },
  expertQuestions: {
    message: "",
    error: false,
  },
};
