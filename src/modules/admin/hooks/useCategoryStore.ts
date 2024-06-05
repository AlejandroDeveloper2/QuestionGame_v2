import { useStore } from "zustand";

import { CategoryStore } from "@admin/types/store-types";

import { categoryStore } from "@admin/store";

const useCategoryStore = (): CategoryStore => {
  return useStore(categoryStore);
};

export default useCategoryStore;
