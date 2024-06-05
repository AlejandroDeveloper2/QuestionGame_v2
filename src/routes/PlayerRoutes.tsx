import { Route, Routes } from "react-router-dom";

import { GamePage } from "@pages/index";
import { PlayerLayout } from "@layout/index";

const PlayerRoutes = (): JSX.Element => {
  return (
    <Routes>
      <Route path="/game/:quizId" element={<PlayerLayout />}>
        <Route index element={<GamePage />} />
      </Route>
    </Routes>
  );
};

export default PlayerRoutes;
