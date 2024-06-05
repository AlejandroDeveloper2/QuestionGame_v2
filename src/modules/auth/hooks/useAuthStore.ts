import { useStore } from "zustand";

import { AuthStore } from "@auth/types/store-types";

import { authStore } from "@auth/store";

const useAuthStore = (): AuthStore => {
  return useStore(authStore);
};

export default useAuthStore;
