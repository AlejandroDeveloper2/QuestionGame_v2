import { LoaderBarProps } from "@core/types/component-types";

import { LoaderContainer, LoaderBody, Load } from "./LoaderBar.style";

const LoaderBar = ({ load }: LoaderBarProps): JSX.Element => {
  return (
    <LoaderContainer>
      <LoaderBody>
        <Load load={load}></Load>
      </LoaderBody>
      <span>Cargando...</span>
    </LoaderContainer>
  );
};

export default LoaderBar;
