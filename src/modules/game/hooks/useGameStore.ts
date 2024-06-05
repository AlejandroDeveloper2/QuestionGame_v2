import { useStore } from "zustand";

import { GameSlice, MatchSlice } from "@game/types/store-types";

import { gameStore } from "@game/store";

const useGameStore = (): GameSlice & MatchSlice => {
  return useStore(gameStore);
};

export default useGameStore;
