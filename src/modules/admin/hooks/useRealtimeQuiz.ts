/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from "react";
import { useParams } from "react-router-dom";

import { client } from "@config/pocketbase";
import { useQuizAdminStore } from "@admin/hooks";
import { quizAdminStore } from "@admin/store";
import { Quiz } from "@admin/types/data-types";

const useRealtimeQuiz = (): void => {
  const urlParams = useParams();
  const urlParam = urlParams as { quizId: string };

  const { quizzes, setQuizzes, getAllQuizzes, getQuiz } = useQuizAdminStore();

  useEffect(() => {
    const realtime = () => {
      // const user=await client
      //   .collection("users")
      //   .authWithPassword("quizgame4050@gmail.com", "1234567890").then((user)=>document.cookie=`token=${user.token}`);
      // client.authStore.loadFromCookie(document.cookie || "");
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
