import styled from "styled-components";

import { ButtonVariantType } from "@core/types/component-types";
import { breakpoints } from "@core/constants";

import { getButtonTextColor, getButtonVariantColor } from "@core/helpers";

const Button = styled.button<{ variant: ButtonVariantType }>`
  width: auto;
  height: auto;
  /* min-width: 300px; */
  padding: var(--spacing-md) var(--spacing-xl);
  background-color: ${({ variant }: { variant: ButtonVariantType }) =>
    getButtonVariantColor(variant)};
  opacity: ${({ disabled }) => (disabled ? 0.7 : 1)};
  display: inline-flex;
  gap: var(--spacing-xs);
  justify-content: center;
  align-items: center;
  border: none;
  border-radius: var(--radius-sm);
  box-shadow: 0 0 15px var(--box-shadow-color);
  cursor: pointer;
  position: relative;
  overflow: hidden;
  svg[id="btn-icon"],
  span {
    color: ${({ variant }: { variant: ButtonVariantType }) =>
      getButtonTextColor(variant)};
    transition: transform ease 0.6s;
  }
  svg[id="btn-icon"] {
    width: 20px;
    height: 20px;
  }

  div[id="spinner"] {
    width: 40px;
    height: 40px;
    div {
      width: 30px;
      height: 30px;
      border-width: 4px;
    }
  }

  span {
    font-size: var(--font-size-md);
    white-space: pre-wrap;
    text-align: center;
    font-weight: bold;
    font-family: var(--primary-font-family);
  }
  &::before {
    content: "";
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    background-color: var(--box-shadow-color);
    transition: transform 0.6s ease;
    transform: translateX(-100%);
  }

  &:hover::before {
    transform: translateX(0);
  }
  &:hover {
    span {
      transform: translateX(5px);
    }
    svg[id="btn-icon"] {
      transform: rotate(5deg);
    }
  }

  @media (min-width: ${breakpoints.tablet}px) {
    /* min-width: 400px; */
    span {
      font-size: var(--font-size-xl);
    }
    svg[id="btn-icon"] {
      width: 24px;
      height: 24px;
    }
  }

  @media (min-width: ${breakpoints.desktop}px) {
    /* min-width: 500px; */
  }
`;

export { Button };
