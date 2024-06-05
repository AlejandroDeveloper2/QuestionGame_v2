/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from "react";

import { useAudio, useGameStore } from ".";

const useTimerSound = (seconds: number): void => {
  const { currentMatch } = useGameStore();

  const { toggle: toggleCountdownSound } = useAudio(
    "/sounds/count-down-sound.mp3"
  );
  const {
    playing,
    toggle: toggleClockSound,
    replayAudio,
    stopAudio,
  } = useAudio("/sounds/tictac-sound.mp3");

  const $buttonTimeout = window.document.createElement("button");
  $buttonTimeout.addEventListener("click", () => toggleCountdownSound());
  const $buttonClocksound = window.document.createElement("button");
  $buttonClocksound.addEventListener("click", () => toggleClockSound());

  useEffect(() => {
    if (seconds === 5) stopAudio();
  }, [seconds]);

  useEffect(() => {
    if (!currentMatch?.isMatchPaused) {
      replayAudio();
      $buttonClocksound.click();
      return;
    }
    if (playing) {
      replayAudio();
      $buttonClocksound.click();
    }
    return () => {
      $buttonClocksound.removeEventListener("click", () => toggleClockSound());
      $buttonClocksound.remove();
    };
  }, [currentMatch?.isMatchPaused]);

  useEffect(() => {
    if (!currentMatch?.isMatchPaused && seconds === 5) {
      $buttonTimeout.click();
    }
    return () => {
      $buttonTimeout.removeEventListener("click", () => toggleCountdownSound());
      $buttonTimeout.remove();
    };
  }, [seconds, currentMatch?.isMatchPaused]);
};

export default useTimerSound;
