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
    client.collection("quiz_v2").subscribe<Quiz>("*", function (e) {
      if (e.action === "delete") {
        setQuizzes(quizzes.filter((quiz) => quiz.id !== e.record.id));
        return;
      }
      if (e.action === "update") {
        setQuizzes(
          quizzes.map((quiz) => {
            if (quiz.id === e.record.id) return e.record;
            return quiz;
          })
        );
        return;
      }
      setQuizzes([e.record, ...quizzes]);
    });
    return () => {
      client.collection("quiz_v2").unsubscribe();
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
