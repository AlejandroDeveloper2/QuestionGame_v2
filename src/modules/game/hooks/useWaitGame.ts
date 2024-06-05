/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { useQuizAdminStore } from "@admin/hooks";

const useWaitGame = () => {
  const [isGameWaiting, setIsGameWaiting] = useState<boolean>(false);
  const [isGameFinished, setIsGameFinished] = useState<boolean>(false);

  const navigate = useNavigate();
  const { quiz, resetQuiz } = useQuizAdminStore();

  useEffect(() => {
    if (quiz && !quiz.isQuizStarted && !quiz.isQuizFinished) {
      setIsGameWaiting(true);
    } else if (quiz && !quiz.isQuizStarted && quiz.isQuizFinished) {
      setIsGameWaiting(true);
      setIsGameFinished(true);
      window.setTimeout(() => {
        setIsGameWaiting(false);
        resetQuiz(quiz.id);
        navigate("/");
      }, 3000);
    } else if (quiz?.isQuizStarted) setIsGameWaiting(false);
  }, [quiz?.isQuizFinished, quiz?.isQuizStarted]);

  return { isGameWaiting, isGameFinished };
};

export default useWaitGame;
