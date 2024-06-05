import { Outlet } from "react-router-dom";

import { MainContainer } from "./PlayerLayout.style";

const PlayerLayout = (): JSX.Element => {
  return (
    <MainContainer>
      <Outlet />
    </MainContainer>
  );
};

export default PlayerLayout;
