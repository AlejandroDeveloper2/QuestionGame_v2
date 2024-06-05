/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";

import { useGameStore } from "@game/hooks";

const useCallTimer = () => {
  const [timerInterval, setTimerInterval] = useState<number>(0);
  const [seconds, setSeconds] = useState<number>(20);

  const { game, currentMatch, inactivateWildCard } = useGameStore();

  const startCallTimer = (): void => {
    setTimerInterval(
      window.setInterval(() => {
        setSeconds((prevState) => {
          if (prevState > 0) {
            return prevState - 1;
          }
          return prevState;
        });
      }, 1000)
    );
  };

  const resetCallTimer = async (): Promise<void> => {
    if (game) await inactivateWildCard(game.id, game);
  };

  useEffect(() => {
    if (currentMatch?.isCallWildCardActive) {
      startCallTimer();
    }
  }, [currentMatch?.isCallWildCardActive]);

  useEffect(() => {
    if (seconds === 0) {
      window.clearInterval(timerInterval);
      resetCallTimer();
    }
  }, [seconds]);

  return {
    startCallTimer,
    callSeconds: `0:${seconds < 10 ? "0" + seconds : seconds}`,
  };
};

export default useCallTimer;
