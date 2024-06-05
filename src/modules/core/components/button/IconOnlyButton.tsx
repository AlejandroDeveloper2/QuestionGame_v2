import { ButtonIconOnlyProps } from "@core/types/component-types";

import { BaseButton } from "..";

const IconOnlyButton = ({
  Icon,
  ...props
}: ButtonIconOnlyProps): JSX.Element => {
  return (
    <BaseButton {...props}>
      <Icon id="btn-icon" />
    </BaseButton>
  );
};

export default IconOnlyButton;
