/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from "react";

import { useGameStore } from "@game/hooks";

const useFloatPopUp = () => {
  const { game, currentMatch, inactivateWildCard } = useGameStore();

  const resetDivided = async () => {
    if (game) inactivateWildCard(game.id, game);
  };

  useEffect(() => {
    if (currentMatch?.selectedAnswers >= 2) {
      resetDivided();
    }
  }, [currentMatch?.isDividedWildCardActive, currentMatch?.selectedAnswers]);
};
export default useFloatPopUp;
