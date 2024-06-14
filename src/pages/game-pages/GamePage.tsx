import { dynamicModalRendered } from "@game/constants";

import {
  useWaitGame,
  useRealtimeGame,
  useGameStore,
  usePlayerInfo,
  useGameSounds,
} from "@game/hooks";
import { useQuizAdminStore, useRealtimeQuiz } from "@admin/hooks";

import { Header, LoadingWindow, NoQuizFound, Spinner } from "@core/components";
import {
  DynamicGameModal,
  GameHeader,
  QuestionBox,
  WildCardMenu,
} from "@game/components";

const GamePage = (): JSX.Element => {
  useRealtimeQuiz();
  useRealtimeGame();

  useGameSounds();
  const { isGameWaiting, isGameFinished } = useWaitGame();
  const player = usePlayerInfo();

  const { quiz } = useQuizAdminStore();
  const { game, currentMatch } = useGameStore();

  if ((quiz && player.id !== "") || game)
    return (
      <>
        <LoadingWindow
          opacity={isGameWaiting ? 1 : 0}
          isLoading={isGameWaiting}
        >
          <Spinner
            message={
              isGameFinished
                ? "¡El quiz ha terminado! Redirigiendo..."
                : "¡Esperando que el administrador inicie el quiz!"
            }
            color="var(--white)"
            direction="column"
          />
        </LoadingWindow>
        {quiz && game && game.matches.length > 0 ? (
          <>
            <Header
              style={{
                height: { sm: 160, md: 180, lg: 180 },
                direction: { sm: "row", md: "row", lg: "row" },
              }}
            >
              <GameHeader />
            </Header>
            {dynamicModalRendered(quiz, currentMatch) ? (
              <DynamicGameModal />
            ) : null}
            <QuestionBox />
            <WildCardMenu />
          </>
        ) : null}
      </>
    );
  return <NoQuizFound to="/" buttonLabel="Volver al inicio" />;
};

export default GamePage;
