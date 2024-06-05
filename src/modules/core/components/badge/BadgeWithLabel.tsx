import { BadgeWithLabelProps } from "@core/types/component-types";

import { Badge } from "@core/components";

import { BadgeContainer } from "./Badge.style";

const BadgeWithLabel = ({
  label,
  ...props
}: BadgeWithLabelProps): JSX.Element => {
  return (
    <BadgeContainer>
      <label>{label}</label>
      <Badge {...props} />
    </BadgeContainer>
  );
};

export default BadgeWithLabel;
