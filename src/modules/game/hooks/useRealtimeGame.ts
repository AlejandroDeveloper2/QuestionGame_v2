/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from "react";
import { useParams } from "react-router-dom";

import { Game } from "@game/types/data-types";

import { useGameStore } from "@game/hooks";
import { gameStore } from "@game/store";

import { client } from "@config/pocketbase";

const useRealtimeGame = () => {
  const urlParams = useParams();
  const urlParam = urlParams as { quizId: string };

  const { games, setGames, getAllGames, getGame } = useGameStore();

  useEffect(() => {
    const realtime = async () => {
      client.collection("game_v2").subscribe<Game>("*", function ({ record }) {
        const x = games.filter((game) => game.id !== record.id);
        setGames([record, ...x]);
      });
    };
    realtime();

    return () => {
      client.realtime.unsubscribe();
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
