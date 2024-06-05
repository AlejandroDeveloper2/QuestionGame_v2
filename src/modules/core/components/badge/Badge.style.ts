import styled from "styled-components";

import { BadgeVariantType, BadgeSizeType } from "@core/types/component-types";

import {
  getBadgePadding,
  getBadgeTextColor,
  getBadgeTextSize,
  getBadgeVariantColor,
} from "@core/helpers";
import breakpoints from "@core/constants/breakpoints";

const BaseBadge = styled.div<{
  variant: BadgeVariantType;
  size: BadgeSizeType;
}>`
  padding: ${({ size }: { size: BadgeSizeType }) => getBadgePadding(size)};
  border-radius: var(--radius-sm);
  background-color: ${({ variant }: { variant: BadgeVariantType }) =>
    getBadgeVariantColor(variant)};
  box-shadow: 0 0 10px var(--box-shadow-color);
  display: flex;
  justify-content: center;
  align-items: center;
  gap: var(--spacing-xs);

  svg {
    width: 32px;
    height: 32px;
    color: ${({ variant }: { variant: BadgeVariantType }) =>
      getBadgeTextColor(variant)};
  }
  span {
    font-size: ${({ size }: { size: BadgeSizeType }) => getBadgeTextSize(size)};
    font-family: var(--primary-font-family);
    color: ${({ variant }: { variant: BadgeVariantType }) =>
      getBadgeTextColor(variant)};
    text-align: center;
    font-weight: bold;
  }
`;

const BadgeContainer = styled.div`
  width: auto;
  display: flex;
  flex-direction: column;
  gap: var(--spacing-xs);
  justify-content: center;
  align-items: center;

  label {
    font-size: var(--font-size-md);
    font-family: var(--primary-font-family);
    color: var(--gray);
    text-align: center;
    font-weight: bold;
    text-transform: capitalize;
  }

  @media (min-width: ${breakpoints.tablet}px) {
    label {
      font-size: var(--font-size-xl);
    }
  }
`;

export { BaseBadge, BadgeContainer };
