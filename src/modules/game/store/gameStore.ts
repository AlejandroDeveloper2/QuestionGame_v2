import { create } from "zustand";

import { GameSlice, MatchSlice } from "@game/types/store-types";

import createGameSlice from "./game-store-slices/gameSlice";
import createMatchSlice from "./game-store-slices/matchSlice";

const gameStore = create<GameSlice & MatchSlice>((...a) => ({
  ...createGameSlice(...a),
  ...createMatchSlice(...a),
}));

export default gameStore;
