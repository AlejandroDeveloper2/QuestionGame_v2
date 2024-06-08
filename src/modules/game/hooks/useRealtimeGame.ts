/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from "react";
import { useParams } from "react-router-dom";

import { useGameStore } from "@game/hooks";
import { gameStore } from "@game/store";

import { client } from "@config/pocketbase";

const useRealtimeGame = () => {
  const urlParams = useParams();
  const urlParam = urlParams as { quizId: string };

  const { games, setGames, getAllGames, getGame } = useGameStore();

  useEffect(() => {
    client.realtime.subscribe("game_v2", function ({ record }) {
      const x = games.filter((game) => game.id !== record.id);
      setGames([record, ...x]);
    });

    return () => {
      client.realtime.unsubscribe("game_v2");
    };
  });

  useEffect(() => {
    getAllGames().then(() => {
      const currentGame = games.filter(
        (game) => game.quizId === urlParam.quizId
      )[0];
      gameStore.setState({
        game: currentGame,
        currentMatch: currentGame?.matches[currentGame?.currentMatchIndex],
      });
    });
  }, []);

  useEffect(() => {
    getGame(urlParam.quizId);
  }, [games]);
};

export default useRealtimeGame;
