/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from "react";

import { useGameStore, useTimerSound } from ".";
import { useLoading } from "@core/hooks";
import { useQuizAdminStore } from "@admin/hooks";

const useMatchTimer = () => {
  const { game, currentMatch, updateGameStatictis, selectAnswer } =
    useGameStore();
  const { quiz } = useQuizAdminStore();

  const questionTime: number = currentMatch?.currentQuestion.time;

  const [timerInterval, setTimerInterval] = useState<number>(0);
  const [seconds, setSeconds] = useState<number>(questionTime);
  const [timeTaken, setTimeTaken] = useState<number>(0);

  const { toggleLoading } = useLoading();

  useTimerSound(seconds);

  const beginTimer = (): void => {
    setTimerInterval(
      window.setInterval(() => {
        setTimeTaken((prevState) => prevState + 1);
        setSeconds((prevState) => {
          if (prevState > 0) {
            return prevState - 1;
          }
          return prevState;
        });
      }, 1000)
    );
  };

  const stopTimer = (): void => {
    window.clearInterval(timerInterval);
  };

  useEffect(() => {
    if (game && quiz?.isQuizCompleted)
      updateGameStatictis(game.id, {
        timeTaken,
      }).then(() => setTimeTaken(0));
  }, [quiz?.isQuizCompleted]);

  useEffect(() => {
    if (!currentMatch?.isMatchPaused) {
      beginTimer();
      return;
    }
    stopTimer();
    if (currentMatch?.matchResult !== "EnEspera") setSeconds(questionTime);

    return () => stopTimer();
  }, [currentMatch?.isMatchPaused, questionTime, currentMatch?.matchResult]);

  useEffect(() => {
    const stopMatchTimeout = async () => {
      if (seconds === 0 && !currentMatch?.isMatchPaused) {
        if (game) await selectAnswer(game.id, 0, game, null, toggleLoading);
        stopTimer();
      }
    };
    stopMatchTimeout();
  }, [seconds, currentMatch?.isMatchPaused]);

  return {
    timerSeconds: `0:${seconds < 10 ? "0" + seconds : seconds}`,
  };
};

export default useMatchTimer;
