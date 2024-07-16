import {
  Question,
  Category,
  QuestionFormData,
  CategoryFormData,
  Quiz,
  QuizFormData,
} from "./data-types";
import { Filter, Loading, Pagination } from "@core/types/data-types";

interface QuestionStore {
  questions: Question[];
  question: Question | null;
  pagination: Pagination<Question>;
  getAllQuestions: (
    toggleLoading: (loadingStatus: Loading) => void
  ) => Promise<void>;
  getQuestions: (
    toggleLoading: (loadingStatus: Loading) => void,
    page?: number,
    limit?: number,
    filter?: Filter<Question>
  ) => Promise<void>;
  getQuestion: (questionId: string) => Promise<void>;
  addQuestion: (
    question: QuestionFormData,
    toggleLoading: (loadingStatus: Loading) => void
  ) => Promise<void>;
  editQuestion: (
    questionId: string,
    updatedQuestion: QuestionFormData,
    toggleLoading: (loadingStatus: Loading) => void
  ) => Promise<void>;
  removeQuestion: (
    questionId: string,
    toggleLoading: (loadingStatus: Loading) => void
  ) => Promise<void>;
}

interface CategoryStore {
  categories: Category[];
  category: Category | null;
  getAllCategories: (
    toggleLoading: (loadingStatus: Loading) => void
  ) => Promise<void>;
  getCategory: (categoryId: string) => Promise<void>;
  addCategory: (
    category: CategoryFormData,
    toggleLoading: (loadingStatus: Loading) => void
  ) => Promise<void>;
  editCategory: (
    categoryId: string,
    updatedCategory: CategoryFormData,
    toggleLoading: (loadingStatus: Loading) => void
  ) => Promise<void>;
  removeCategory: (
    categoryId: string,
    toggleLoading: (loadingStatus: Loading) => void
  ) => Promise<void>;
}

interface QuizAdminStore {
  quizzes: Quiz[];
  quiz: Quiz | null;
  setQuizzes: (quizzes: Quiz[]) => void;
  createQuiz: (
    newQuiz: QuizFormData,
    toggleLoading: (loadingStatus: Loading) => void
  ) => Promise<void>;
  getAllQuizzes: () => Promise<void>;
  getQuiz: (quizId: string) => Promise<void>;
  startQuiz: (
    quizId: string,
    questionsBank: Question[],
    toggleLoading: (loadingStatus: Loading) => void
  ) => Promise<void>;
  finishQuiz: (
    quizId: string,
    toggleLoading: (loadingStatus: Loading) => void
  ) => Promise<void>;
  resetQuiz: (quizId: string) => Promise<void>;

  exitQuiz: (
    quizId: string,
    toggleLoading: (loadingStatus: Loading) => void
  ) => Promise<void>;
  restartQuiz: (
    quizId: string,
    gameId: string,
    questionsBank: Question[],
    toggleLoading: (loadingStatus: Loading) => void
  ) => Promise<void>;
  setConsolationAward: (
    quizId: string,
    consolationAward: string,
    toggleLoading: (loadingStatus: Loading) => void
  ) => Promise<void>;
  deleteQuiz: (quizId: string) => Promise<void>;
}

export type { QuestionStore, CategoryStore, QuizAdminStore };
