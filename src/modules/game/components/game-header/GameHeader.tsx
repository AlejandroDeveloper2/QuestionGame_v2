import { Coins, Hourglass } from "iconoir-react";

import { useGameStore, useMatchTimer, usePlayerInfo } from "@game/hooks";
import { useScreenSize } from "@core/hooks";
import {
  getDifficultyBadgeIcon,
  getDifficultyBadgeVariant,
} from "@game/helpers";

import { Badge, BadgeWithLabel } from "@core/components";

import { TitleContainer } from "@core/styles/GlobalStyles.style";
import { GameHeaderContainer } from "./GameHeader.style";

const GameHeader = (): JSX.Element => {
  const size = useScreenSize();

  const { game, currentMatch } = useGameStore();

  const player = usePlayerInfo();
  const { timerSeconds } = useMatchTimer();

  return (
    <GameHeaderContainer>
      <Badge
        id="difficulty-badge"
        size="normal"
        variant={getDifficultyBadgeVariant(
          currentMatch?.currentQuestion?.difficulty
        )}
        Icon={getDifficultyBadgeIcon(currentMatch?.currentQuestion?.difficulty)}
        value={currentMatch?.currentQuestion?.difficulty}
      />
      <BadgeWithLabel
        id="badge-time"
        label="Tiempo restante"
        variant="neutral"
        Icon={Hourglass}
        value={timerSeconds + "s"}
        size={size === "mobile" ? "normal" : "large"}
      />
      <TitleContainer id="title-container">
        <h1>{`${currentMatch ? currentMatch.currentQuestionIndex + 1 : 0}/${
          game ? game.matches.length : 0
        }`}</h1>
        <p>
          <span>Bienvenido:</span>
          {player.username ? player.username : "Sin Nombre"}
        </p>
      </TitleContainer>
      <BadgeWithLabel
        id="badge-money"
        label="Dinero acumulado"
        variant="primary"
        size={size === "mobile" ? "normal" : "large"}
        Icon={Coins}
        value={`$${game ? game.accumulatedEarn : 0}`}
      />
    </GameHeaderContainer>
  );
};

export default GameHeader;
