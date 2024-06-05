import { LogoProps } from "@core/types/component-types";

import { LogoIcon } from "@assets/svg";

import { LogoContainer, LogoFirstLayer, LogoSecondLayer } from "./Logo.style";

const Logo = (props: LogoProps): JSX.Element => {
  return (
    <LogoContainer {...props}>
      <LogoFirstLayer>
        <LogoSecondLayer {...props}>
          <LogoIcon />
          <span>quiz game</span>
        </LogoSecondLayer>
      </LogoFirstLayer>
    </LogoContainer>
  );
};

export default Logo;
