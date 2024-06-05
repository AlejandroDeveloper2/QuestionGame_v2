/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from "react";
import { useParams } from "react-router-dom";

import { client } from "@config/pocketbase";
import { useGameStore } from "@game/hooks";

const useRealtimeGame = (): void => {
  const urlParams = useParams();
  const urlParam = urlParams as { quizId: string };

  const { games, setGames, getAllGames, getGame } = useGameStore();

  useEffect(() => {
    client.realtime.subscribe("game_v2", function (e) {
      const x = games.filter((game) => game.id !== e.record.id);
      setGames([e.record, ...x]);
    });
    return () => {
      client.realtime.unsubscribe();
    };
  });

  useEffect(() => {
    getAllGames();
  }, []);

  useEffect(() => {
    getGame(urlParam.quizId);
  }, [games]);
};

export default useRealtimeGame;
