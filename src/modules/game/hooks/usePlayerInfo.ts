/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from "react";
import { useParams } from "react-router-dom";

import { Player } from "@auth/types/data-types";

import { useAuthStore } from "@auth/hooks";

const usePlayerInfo = (): Player => {
  const urlParams = useParams();
  const urlParam = urlParams as { quizId: string };

  const { player, getPlayer } = useAuthStore();

  useEffect(() => {
    getPlayer(urlParam.quizId);
  }, []);

  return player;
};

export default usePlayerInfo;
