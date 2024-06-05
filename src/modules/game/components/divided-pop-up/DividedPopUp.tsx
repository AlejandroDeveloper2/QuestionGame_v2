import { Slash } from "iconoir-react";

import { DividedPopUpProps } from "@game/types/component-types";

import { useGameStore } from "@game/hooks";

import { PopUpContainer } from "./DividedPopUp.style";

const DividedPopUp = ({ isPopUpVisible }: DividedPopUpProps): JSX.Element => {
  const { currentMatch } = useGameStore();

  return (
    <PopUpContainer positionx={isPopUpVisible ? 1 : 0}>
      <Slash />
      <p>Selecciona hasta dos preguntas</p>
      <span>{currentMatch?.selectedAnswers} / 2</span>
    </PopUpContainer>
  );
};

export default DividedPopUp;
