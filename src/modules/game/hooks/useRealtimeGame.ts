/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from "react";
import { useParams } from "react-router-dom";

import { Game } from "@game/types/data-types";

import { useGameStore } from "@game/hooks";

import { client } from "@config/pocketbase";

const useRealtimeGame = () => {
  const urlParams = useParams();
  const urlParam = urlParams as { quizId: string };

  const { games, setGames, getAllGames, getGame } = useGameStore();

  useEffect(() => {
    client.collection("game_v2").subscribe<Game>("*", function ({ record }) {
      const x = games.filter((game) => game.id !== record.id);
      setGames([record, ...x]);
    });

    return () => {
      client.collection("game_v2").unsubscribe("*");
    };
  });

  useEffect(() => {
    getAllGames();
  }, []);

  useEffect(() => {
    if (games.some((game) => game.quizId === urlParam.quizId))
      getGame(urlParam.quizId);
  }, [games]);
};

export default useRealtimeGame;
