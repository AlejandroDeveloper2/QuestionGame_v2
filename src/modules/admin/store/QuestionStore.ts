import { create } from "zustand";
import { toast } from "react-toastify";

import { QuestionStore } from "@admin/types/store-types";
import { Loading, ServerResponse } from "@core/types/data-types";
import { Question, QuestionFormData } from "@admin/types/data-types";

import { QuestionService } from "@admin/services";
import { ListResult } from "pocketbase";

const questionService = new QuestionService();

const questionStore = create<QuestionStore>((set, get) => ({
  questions: [],
  question: null,
  pagination: {
    page: 0,
    perPage: 0,
    totalItems: 0,
    totalPages: 0,
  },
  getAllQuestions: async (
    toggleLoading: (loadingStatus: Loading) => void
  ): Promise<void> => {
    toggleLoading({
      isLoading: true,
      message: "Cargando banco de preguntas...",
    });
    try {
      const questions: Question[] = await questionService.getAllQuestions();
      set({ questions });
    } catch (_e: unknown) {
      const parsedError = _e as ServerResponse;
      toast.error(parsedError.message);
    } finally {
      toggleLoading({
        isLoading: false,
        message: "",
      });
    }
  },
  getQuestions: async (
    toggleLoading: (loadingStatus: Loading) => void,
    page,
    limit,
    filter
  ): Promise<void> => {
    toggleLoading({
      isLoading: true,
      message: "Cargando preguntas...",
    });
    try {
      const {
        items,
        page: currentPage,
        perPage,
        totalItems,
        totalPages,
      }: ListResult<Question> = await questionService.getQuestions(
        page,
        limit,
        filter
      );
      set({
        questions: items,
        pagination: {
          page: currentPage,
          perPage,
          totalItems,
          totalPages,
        },
      });
    } catch (_e: unknown) {
      const parsedError = _e as ServerResponse;
      toast.error(parsedError.message);
    } finally {
      toggleLoading({
        isLoading: false,
        message: "",
      });
    }
  },
  getQuestion: async (questionId: string): Promise<void> => {
    try {
      const question: Question = await questionService.getQuestion(questionId);
      set({ question });
    } catch (_e: unknown) {
      const parsedError = _e as ServerResponse;
      toast.error(parsedError.message);
    }
  },
  addQuestion: async (
    question: QuestionFormData,
    toggleLoading: (loadingStatus: Loading) => void
  ): Promise<void> => {
    toggleLoading({
      isLoading: true,
      message: "Agregando pregunta...",
    });
    try {
      const newQuestion: Question = await questionService.addQuestion(question);
      set(({ questions }) => ({ questions: [...questions, newQuestion] }));
      await get().getQuestions(toggleLoading, get().pagination.page, 12);
      toast.success("¡Pregunta añadida correctamente!");
    } catch (_e: unknown) {
      const parsedError = _e as ServerResponse;
      toast.error(parsedError.message);
    } finally {
      toggleLoading({
        isLoading: false,
        message: "",
      });
    }
  },
  editQuestion: async (
    questionId: string,
    updatedQuestion: QuestionFormData,
    toggleLoading: (loadingStatus: Loading) => void
  ): Promise<void> => {
    toggleLoading({
      isLoading: true,
      message: "Actualizando pregunta...",
    });
    try {
      const modifiedQuestion: Question = await questionService.editQuestion(
        questionId,
        updatedQuestion
      );
      set(({ questions }) => ({
        questions: questions.map((question) => {
          if (question.id === questionId) return modifiedQuestion;
          return question;
        }),
      }));
      toast.success("¡Pregunta actualizada correctamente!");
    } catch (_e: unknown) {
      const parsedError = _e as ServerResponse;
      toast.error(parsedError.message);
    } finally {
      toggleLoading({
        isLoading: false,
        message: "",
      });
    }
  },
  removeQuestion: async (
    questionId: string,
    toggleLoading: (loadingStatus: Loading) => void
  ): Promise<void> => {
    toggleLoading({
      isLoading: true,
      message: "Eliminando pregunta...",
    });
    try {
      await questionService.removeQuestion(questionId);
      set(({ questions }) => ({
        questions: questions.filter((question) => question.id !== questionId),
      }));
      await get().getQuestions(toggleLoading, get().pagination.page, 12);
      toast.success("¡Pregunta eliminada correctamente!");
    } catch (_e: unknown) {
      const parsedError = _e as ServerResponse;
      toast.error(parsedError.message);
    } finally {
      toggleLoading({
        isLoading: false,
        message: "",
      });
    }
  },
}));

export default questionStore;
