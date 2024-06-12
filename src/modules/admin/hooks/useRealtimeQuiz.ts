/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from "react";
import { useParams } from "react-router-dom";

import { Quiz } from "@admin/types/data-types";

import { useQuizAdminStore } from "@admin/hooks";
import { client } from "@config/pocketbase";

const useRealtimeQuiz = () => {
  const urlParams = useParams();
  const urlParam = urlParams as { quizId: string };

  const { quizzes, setQuizzes, getAllQuizzes, getQuiz } = useQuizAdminStore();

  useEffect(() => {
    client.collection("quiz_v2").subscribe<Quiz>(urlParam.quizId, function (e) {
      const x = quizzes.filter((quiz) => quiz.id !== e.record.id);
      setQuizzes([e.record, ...x]);
    });
    return () => {
      client.collection("quiz_v2").unsubscribe(urlParam.quizId);
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
