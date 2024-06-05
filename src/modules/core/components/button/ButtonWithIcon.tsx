import { ButtonWithIconProps } from "@core/types/component-types";

import { ButtonWithLabel } from "..";

const ButtonWithIcon = ({
  Icon,
  ...props
}: ButtonWithIconProps): JSX.Element => {
  return (
    <ButtonWithLabel {...props}>
      <Icon id="btn-icon" />
    </ButtonWithLabel>
  );
};

export default ButtonWithIcon;
