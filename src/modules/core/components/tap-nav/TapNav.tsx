import { TapNavProps } from "@core/types/component-types";

import Tap from "./Tap";

import { Nav } from "./TapNav.style";

const TapNav = ({ children }: TapNavProps): JSX.Element => {
  return (
    <Nav>
      <ul>{children}</ul>
    </Nav>
  );
};

TapNav.Tap = Tap;

export default TapNav;
