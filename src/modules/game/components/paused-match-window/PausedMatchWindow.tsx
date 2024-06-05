import { Pause } from "iconoir-react";

import { AnswerResultTitle, MessageContainer } from "./PausedMatchWindow.style";

const PausedMatchWindow = (): JSX.Element => {
  return (
    <>
      <AnswerResultTitle>Esperando</AnswerResultTitle>
      <MessageContainer>
        <Pause />
        <p>Esperando a que se inicie el conteo regresivo!</p>
      </MessageContainer>
    </>
  );
};

export default PausedMatchWindow;
