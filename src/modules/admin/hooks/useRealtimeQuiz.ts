/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from "react";
import { useParams } from "react-router-dom";

import { client } from "@config/pocketbase";
import { useQuizAdminStore } from "@admin/hooks";
import { quizAdminStore } from "@admin/store";

const useRealtimeQuiz = (): void => {
  const urlParams = useParams();
  const urlParam = urlParams as { quizId: string };

  const { quizzes, setQuizzes, getAllQuizzes, getQuiz } = useQuizAdminStore();

  useEffect(() => {
    client.realtime.subscribe("quiz_v2", function (e) {
      const x = quizzes.filter((quiz) => quiz.id !== e.record.id);
      setQuizzes([e.record, ...x]);
    });
    return () => {
      client.realtime.unsubscribe();
    };
  });

  useEffect(() => {
    getAllQuizzes().then(() => {
      const currentQuiz = quizzes.filter(
        (quiz) => quiz.id === urlParam.quizId
      )[0];
      quizAdminStore.setState({
        quiz: currentQuiz,
      });
    });
  }, []);

  useEffect(() => {
    getQuiz(urlParam.quizId);
  }, [quizzes]);
};

export default useRealtimeQuiz;
