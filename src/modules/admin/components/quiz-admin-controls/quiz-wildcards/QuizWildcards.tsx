import { Phone, Slash } from "iconoir-react";

import { Quiz } from "@admin/types/data-types";

import { useCallTimer, useFloatPopUp, useGameStore } from "@game/hooks";
import { useQuizAdminStore } from "@admin/hooks";
import { validateCallControl, validateDividedControl } from "@admin/helpers";

import { IconOnlyButton } from "@core/components";

import { QuizWildcardsContainer } from "./QuizWildcards.style";

const QuizWildcards = (): JSX.Element => {
  const { quiz } = useQuizAdminStore();
  const { game, currentMatch, spendWildCard } = useGameStore();

  useCallTimer();
  useFloatPopUp();

  return (
    <QuizWildcardsContainer>
      <p>Comodines</p>
      <menu>
        <IconOnlyButton
          disabled={validateDividedControl(quiz as Quiz, currentMatch)}
          type="button"
          Icon={Slash}
          variant="neutral"
          title="Comodin 50/50"
          onClick={() => {
            if (game) spendWildCard(game.id, game, "divided");
          }}
        />
        <IconOnlyButton
          disabled={validateCallControl(quiz as Quiz, currentMatch)}
          type="button"
          Icon={Phone}
          variant="primary"
          title="Comodin llamada a un amigo"
          onClick={() => {
            if (game) spendWildCard(game.id, game, "call");
          }}
        />
      </menu>
    </QuizWildcardsContainer>
  );
};

export default QuizWildcards;
