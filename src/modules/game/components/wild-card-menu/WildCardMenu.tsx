import { Phone, Slash } from "iconoir-react";

import { Quiz } from "@admin/types/data-types";

import { validateCallControl, validateDividedControl } from "@admin/helpers";
import { useCallTimer, useFloatPopUp, useGameStore } from "@game/hooks";
import { useQuizAdminStore } from "@admin/hooks";

import { CallWildCardModal, DividedPopUp } from "@game/components";
import { IconOnlyButton } from "@core/components";

import { WildCardsMenuContainer } from "./WildCardMenu.style";

const WildCardMenu = (): JSX.Element => {
  const { callSeconds } = useCallTimer();
  useFloatPopUp();

  const { game, currentMatch, spendWildCard } = useGameStore();
  const { quiz } = useQuizAdminStore();

  return (
    <>
      <DividedPopUp isPopUpVisible={currentMatch?.isDividedWildCardActive} />
      <CallWildCardModal callSecondsDuration={callSeconds} />

      <WildCardsMenuContainer>
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
      </WildCardsMenuContainer>
    </>
  );
};

export default WildCardMenu;
