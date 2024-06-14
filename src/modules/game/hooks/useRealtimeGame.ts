/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from "react";
import { useParams } from "react-router-dom";

import { Game } from "@game/types/data-types";

import { useGameStore } from "@game/hooks";

import { client } from "@config/pocketbase";

const useRealtimeGame = () => {
  const urlParams = useParams();
  const urlParam = urlParams as { quizId: string };

  const { games, game, setGames, getAllGames, getGame } = useGameStore();

  useEffect(() => {
    client.collection("game_v2").subscribe<Game>("*", function (e) {
      if (e.action === "delete") {
        setGames(games.filter((game) => game.id !== e.record.id));
        return;
      }
      if (e.action === "update") {
        setGames(
          games.map((game) => {
            if (game.id === e.record.id) return e.record;
            return game;
          })
        );
        window.localStorage.setItem(
          "initializedGame",
          JSON.stringify(e.record)
        );
        return;
      }
      setGames([e.record, ...games]);
      window.localStorage.setItem("initializedGame", JSON.stringify(e.record));
    });

    return () => {
      client.collection("game_v2").unsubscribe();
    };
  });

  useEffect(() => {
    getAllGames();
  }, [game]);

  useEffect(() => {
    getGame(urlParam.quizId);
  }, [games]);
};

export default useRealtimeGame;
