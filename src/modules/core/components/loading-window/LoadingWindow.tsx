import { LoadingWindowProps } from "@core/types/component-types";

import { Logo } from "@core/components";
import { IconIllustration1, IconIllustration2 } from "@assets/svg";

import {
  Content,
  LoadingWindowContainer,
  logoDimension,
} from "./LoadingWindow.style";

const LoadingWindow = ({
  children,
  opacity,
  isLoading,
}: LoadingWindowProps): JSX.Element => {
  return (
    <LoadingWindowContainer opacity={opacity} isloading={String(isLoading)}>
      <IconIllustration1 />
      <IconIllustration2 />
      <Content>
        <Logo width={logoDimension} height={logoDimension} />
        {children}
      </Content>
    </LoadingWindowContainer>
  );
};

export default LoadingWindow;
