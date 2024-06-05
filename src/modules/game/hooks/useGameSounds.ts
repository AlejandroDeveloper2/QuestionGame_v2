/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from "react";

import { useAudio, useGameStore } from ".";
import { useQuizAdminStore } from "@admin/hooks";

const useGameSounds = (): void => {
  const { currentMatch } = useGameStore();
  const { quiz } = useQuizAdminStore();

  const { toggle: toggleLoserSound } = useAudio("/sounds/loser-sound.mp3");
  const { toggle: toggleWinnerSound } = useAudio("/sounds/winner-sound.mp3");
  const { toggle: toggleWrongAnswerSound } = useAudio(
    "/sounds/wrong-answer-sound.mp3"
  );
  const { toggle: toggleCorrectAnswerSound } = useAudio(
    "/sounds/correct-answer-sound.mp3"
  );

  const $buttonCorrect = window.document.createElement("button");
  const $buttonInCorrect = window.document.createElement("button");
  $buttonCorrect.addEventListener("click", () => toggleCorrectAnswerSound());
  $buttonInCorrect.addEventListener("click", () => toggleWrongAnswerSound());

  useEffect(() => {
    if (currentMatch?.matchResult === "Correcta") {
      $buttonCorrect.click();
    } else if (currentMatch?.matchResult === "Incorrecta") {
      $buttonInCorrect.click();
    }
    return () => {
      $buttonCorrect.removeEventListener("click", () =>
        toggleCorrectAnswerSound()
      );
      $buttonInCorrect.removeEventListener("click", () =>
        toggleWrongAnswerSound()
      );
      $buttonCorrect.remove();
      $buttonInCorrect.remove();
    };
  }, [currentMatch?.matchResult]);

  useEffect(() => {
    if (quiz?.isQuizCompleted && currentMatch?.matchResult === "Correcta") {
      toggleWinnerSound();
    } else if (
      (quiz?.isQuizCompleted && currentMatch?.matchResult === "Incorrecta") ||
      (quiz?.isQuizCompleted &&
        currentMatch?.matchResult === "SinResponderRetirado")
    ) {
      toggleLoserSound();
    }
  }, [quiz?.isQuizCompleted, currentMatch?.matchResult]);
};

export default useGameSounds;
