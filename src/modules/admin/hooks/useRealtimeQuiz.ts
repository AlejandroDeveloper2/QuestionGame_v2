/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from "react";
import { useParams } from "react-router-dom";

import { Quiz } from "@admin/types/data-types";

import { useQuizAdminStore } from "@admin/hooks";
import { quizAdminStore } from "@admin/store";
import { client } from "@config/pocketbase";

const useRealtimeQuiz = () => {
  const urlParams = useParams();
  const urlParam = urlParams as { quizId: string };

  const { quizzes, setQuizzes, getAllQuizzes, getQuiz } = useQuizAdminStore();

  useEffect(() => {
    const realtime = async () => {
      client.collection("quiz_v2").subscribe<Quiz>("*", function (e) {
        const x = quizzes.filter((quiz) => quiz.id !== e.record.id);
        setQuizzes([e.record, ...x]);
      });
    };
    realtime();
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
