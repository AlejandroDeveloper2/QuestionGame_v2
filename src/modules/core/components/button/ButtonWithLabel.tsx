import { ButtonWithLabelProps } from "@core/types/component-types";

import { BaseButton } from "..";

const ButtonWithLabel = ({
  label,
  children,
  ...props
}: ButtonWithLabelProps): JSX.Element => {
  return (
    <BaseButton {...props}>
      {children}
      <span>{label}</span>
    </BaseButton>
  );
};

export default ButtonWithLabel;
