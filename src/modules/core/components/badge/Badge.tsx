import { BadgeProps } from "@core/types/component-types";

import { BaseBadge } from "./Badge.style";

const Badge = ({ Icon, value, ...props }: BadgeProps): JSX.Element => {
  return (
    <BaseBadge {...props}>
      <Icon />
      <span>{value}</span>
    </BaseBadge>
  );
};

export default Badge;
