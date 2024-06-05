import { useStore } from "zustand";

import { QuizAdminStore } from "@admin/types/store-types";

import { quizAdminStore } from "@admin/store";

const useQuizAdminStore = (): QuizAdminStore => {
  return useStore(quizAdminStore);
};

export default useQuizAdminStore;
