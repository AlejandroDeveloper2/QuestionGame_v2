/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from "react";
import { useParams } from "react-router-dom";

import { Player } from "@auth/types/data-types";

import { useAuthStore } from "@auth/hooks";
import { useQuizAdminStore } from "@admin/hooks";

const usePlayerInfo = (): Player => {
  const urlParams = useParams();
  const urlParam = urlParams as { quizId: string };

  const { quiz } = useQuizAdminStore();
  const { player, getPlayer } = useAuthStore();

  useEffect(() => {
    if (!quiz?.isQuizFinished) getPlayer(urlParam.quizId);
  }, [quiz?.isQuizFinished]);

  return player;
};

export default usePlayerInfo;
