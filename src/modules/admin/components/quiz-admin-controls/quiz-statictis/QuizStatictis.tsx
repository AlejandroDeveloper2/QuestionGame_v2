import { DoubleCheck, Pause, Timer } from "iconoir-react";

import { BadgeVariantType, IconType } from "@core/types/component-types";

import { useGameStore } from "@game/hooks";
import { getCorrectAnswer, getPlayerAnswerBadgeInfo } from "@admin/helpers";

import { BadgeWithLabel } from "@core/components";

const QuizStatictis = (): JSX.Element => {
  const { currentMatch } = useGameStore();

  const [Icon, variant, value] = getPlayerAnswerBadgeInfo(
    currentMatch?.matchResult
  );

  return (
    <>
      <BadgeWithLabel
        id="badge-timer-status"
        label="Estado del timer"
        size="normal"
        Icon={!currentMatch?.isMatchPaused ? Timer : Pause}
        variant="secondary"
        value={!currentMatch?.isMatchPaused ? "Corriendo" : "Pausado"}
      />

      <BadgeWithLabel
        id="badge-correct-answer"
        label="Respuesta correcta "
        Icon={DoubleCheck}
        variant="success"
        size="normal"
        value={
          getCorrectAnswer(currentMatch?.currentQuestion.answers).answerMark
        }
      />

      <BadgeWithLabel
        id="badge-player-answer"
        label="Respuesta del jugador"
        Icon={Icon as IconType}
        size="normal"
        variant={variant as BadgeVariantType}
        value={value as string}
      />
    </>
  );
};

export default QuizStatictis;
