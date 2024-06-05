import { Coins, HelpCircle, Timer } from "iconoir-react";

import { useQuizAdminStore } from "@admin/hooks";
import { useAuthStore } from "@auth/hooks";
import { useGameStore } from "@game/hooks";
import { formatSeconds } from "@core/helpers";

import { BadgeWithLabel } from "@core/components";
import { WinnerSvg, CheckSvg } from "@assets/svg";

import { GameResultTitle, PlayerFinalStatistics } from "./GameOverWindow.style";

const GameOverWindow = (): JSX.Element => {
  const { quiz } = useQuizAdminStore();
  const { player } = useAuthStore();
  const { currentMatch, game } = useGameStore();

  return (
    <>
      <GameResultTitle
        style={{
          color: "var(--green)",
        }}
      >
        {currentMatch?.matchResult === "Correcta"
          ? "¡Felicitaciones"
          : "¡Ganancias de "}
        <span>{player.username}!</span>
      </GameResultTitle>
      {currentMatch.matchResult === "Correcta" ? <WinnerSvg /> : <CheckSvg />}

      <PlayerFinalStatistics>
        <li>
          <BadgeWithLabel
            id="badge-total-earns"
            label="Total Ganancias"
            Icon={Coins}
            variant="primary"
            size="normal"
            value={
              window.parseInt(quiz ? quiz.consolationAward : "0") > 0
                ? "$" + quiz?.consolationAward
                : "$" + String(game?.accumulatedEarn)
            }
          />
        </li>
        <li>
          <BadgeWithLabel
            id="badge-total-time"
            label="Tiempo Total"
            Icon={Timer}
            variant="neutral"
            size="normal"
            value={formatSeconds(game ? game.timeTaken : 0) + "s"}
          />
        </li>
        <li>
          <BadgeWithLabel
            id="badge-used-wildcards"
            label="Comodines usados"
            Icon={HelpCircle}
            variant="secondary"
            size="normal"
            value={game ? game.usedWildcards : 0}
          />
        </li>
      </PlayerFinalStatistics>
    </>
  );
};

export default GameOverWindow;
