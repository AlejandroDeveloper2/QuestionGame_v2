/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from "react";
import { useParams } from "react-router-dom";

import { client } from "@config/pocketbase";
import { useQuizAdminStore } from "@admin/hooks";

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
    getAllQuizzes();
  }, []);

  useEffect(() => {
    getQuiz(urlParam.quizId);
  }, [quizzes]);
};

export default useRealtimeQuiz;
