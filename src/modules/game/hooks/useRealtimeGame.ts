/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from "react";
import { useParams } from "react-router-dom";

import { client } from "@config/pocketbase";
import { useGameStore } from "@game/hooks";
import { gameStore } from "@game/store";
import { Game } from "@game/types/data-types";

const useRealtimeGame = (): void => {
  const urlParams = useParams();
  const urlParam = urlParams as { quizId: string };

  const { games, setGames, getAllGames, getGame } = useGameStore();

  useEffect(() => {
    const realtime = () => {
      // await client
      //   .collection("users")
      //   .authWithPassword("test@example.com", "1234567890");
      // client.authStore.loadFromCookie(document.cookie || "");

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
