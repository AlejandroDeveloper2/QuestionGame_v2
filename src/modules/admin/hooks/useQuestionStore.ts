import { useStore } from "zustand";

import { QuestionStore } from "@admin/types/store-types";

import { questionStore } from "@admin/store";

const useQuestionStore = (): QuestionStore => {
  return useStore(questionStore);
};

export default useQuestionStore;
