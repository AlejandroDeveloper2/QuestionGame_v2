import { create } from "zustand";
import { toast } from "react-toastify";

import { quizData } from "@admin/constants";
import { gameData } from "@game/constants";

import { QuizAdminStore } from "@admin/types/store-types";
import { Quiz } from "@admin/types/data-types";
import { ServerResponse } from "@core/types/data-types";

import { QuizService } from "@admin/services";
import { getRandomQuestions } from "@admin/utils";
import { getUpdatedQuizzesState } from "@admin/helpers";

import { gameStore } from "@game/store";
import { authStore } from "@auth/store";

const quizService = new QuizService();

const { easyQuestions, mediumQuestions, expertQuestions } = quizData;

const quizAdminStore = create<QuizAdminStore>((set) => ({
  quizzes: [],
  quiz: null,
  setQuizzes: (quizzes): void => {
    set({ quizzes });
  },
  createQuiz: async (newQuiz, toggleLoading): Promise<void> => {
    toggleLoading({
      isLoading: true,
      message: "Creando quiz...",
    });
    try {
      const quiz: Quiz = await quizService.createQuiz(newQuiz);
      set(({ quizzes }) => ({ quizzes: [...quizzes, quiz] }));
      toast.success("¡Quiz creado con exito!");
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
  getAllQuizzes: async (): Promise<void> => {
    try {
      const quizzes: Quiz[] = await quizService.getAllQuizzes();
      set({ quizzes });
    } catch (_e: unknown) {
      const parsedError = _e as ServerResponse;
      toast.error(parsedError.message);
    }
  },
  getQuiz: async (quizId): Promise<void> => {
    try {
      const quiz: Quiz = await quizService.getQuiz(quizId);
      set({ quiz });
    } catch (_e: unknown) {
      set({ quiz: null });
      const parsedError = _e as ServerResponse;
      toast.error(parsedError.message);
      throw new Error(parsedError.message);
    }
  },

  startQuiz: async (quizId, questionsBank, toggleLoading): Promise<void> => {
    toggleLoading({
      isLoading: true,
      message: "Iniciando quiz...",
    });
    try {
      const updatedQuiz: Quiz = await quizService.updateQuizStatus(
        quizId,
        {
          isQuizStarted: true,
          questions: getRandomQuestions(questionsBank, {
            easyQuestions,
            mediumQuestions,
            expertQuestions,
          }),
          isQuizFinished: false,
        },
        "¡Ha ocurrido un error al iniciar el quiz!"
      );

      await gameStore
        .getState()
        .createGame(gameData, quizId, updatedQuiz.questions);

      set(({ quizzes }) => ({
        quizzes: getUpdatedQuizzesState(quizzes, updatedQuiz),
      }));
      toast.success("¡Quiz iniciado con exito!");
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
  finishQuiz: async (quizId, toggleLoading): Promise<void> => {
    toggleLoading({
      isLoading: true,
      message: "Finalizando quiz...",
    });

    try {
      await authStore.getState().getPlayer(quizId);
      await authStore.getState().clearPlayer(authStore.getState().player.id);
      const updatedQuiz: Quiz = await quizService.updateQuizStatus(
        quizId,
        {
          isQuizFinished: true,
          isQuizStarted: false,
          isQuizCompleted: false,
          questions: [],
          consolationAward: "",
        },
        "¡Ha ocurrido un error al finalizar el quiz!"
      );
      set(({ quizzes }) => ({
        quizzes: getUpdatedQuizzesState(quizzes, updatedQuiz),
      }));
      toast.success("¡Quiz finalizado con exito!");
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
  resetQuiz: async (quizId): Promise<void> => {
    try {
      const updatedQuiz: Quiz = await quizService.updateQuizStatus(
        quizId,
        {
          isQuizFinished: false,
        },
        "¡Ha ocurrido un error al resetear el quiz!"
      );

      set(({ quizzes }) => ({
        quizzes: getUpdatedQuizzesState(quizzes, updatedQuiz),
      }));
    } catch (_e: unknown) {
      const parsedError = _e as ServerResponse;
      toast.error(parsedError.message);
    }
  },
  exitQuiz: async (quizId, toggleLoading): Promise<void> => {
    toggleLoading({
      isLoading: true,
      message: "Saliendo del quiz...",
    });
    try {
      const updatedQuiz: Quiz = await quizService.updateQuizStatus(
        quizId,
        { isQuizCompleted: true },
        "¡Ha ocurrido un error al retirarse del quiz!"
      );
      set(({ quizzes }) => ({
        quizzes: getUpdatedQuizzesState(quizzes, updatedQuiz),
      }));
      toast.success("¡Te has retirado con exito!");
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
  restartQuiz: async (quizId, questionsBank, toggleLoading): Promise<void> => {
    toggleLoading({
      isLoading: true,
      message: "Reiniciando quiz...",
    });
    try {
      const updatedQuiz: Quiz = await quizService.updateQuizStatus(
        quizId,
        {
          isQuizStarted: true,
          isQuizFinished: false,
          isQuizCompleted: false,
          questions: getRandomQuestions(questionsBank, {
            easyQuestions,
            mediumQuestions,
            expertQuestions,
          }),
          consolationAward: "",
        },
        "¡Ha ocurrido un error al reiniciar el quiz!"
      );

      set(({ quizzes }) => ({
        quizzes: getUpdatedQuizzesState(quizzes, updatedQuiz),
      }));
      toast.success("¡Quiz reiniciado!");
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
  setConsolationAward: async (
    quizId,
    consolationAward,
    toggleLoading
  ): Promise<void> => {
    toggleLoading({
      isLoading: true,
      message: "Concediendo premio de consolación...",
    });
    try {
      const updatedQuiz: Quiz = await quizService.updateQuizStatus(
        quizId,
        { consolationAward },
        "¡Ha ocurrido un error al conceder premio de consolación!"
      );
      set(({ quizzes }) => ({
        quizzes: getUpdatedQuizzesState(quizzes, updatedQuiz),
      }));
      toast.success("¡Premio concedido!");
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

  deleteQuiz: async (quizId): Promise<void> => {
    try {
      await quizService.deleteQuiz(quizId);
      set(({ quizzes }) => ({
        quizzes: quizzes.filter((quiz) => quiz.id !== quizId),
      }));
    } catch (_e: unknown) {
      const parsedError = _e as ServerResponse;
      toast.error(parsedError.message);
    }
  },
}));

export default quizAdminStore;
