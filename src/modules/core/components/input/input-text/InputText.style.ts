import styled, { css } from "styled-components";

import { breakpoints } from "@core/constants";

export const inputTextStyle = css`
  font-size: var(--font-size-md);
  font-family: var(--primary-font-family);
  font-weight: normal;
  text-align: left;

  @media (min-width: ${breakpoints.tablet}px) {
    font-size: var(--font-size-xl);
  }
`;

const InputElement = styled.input`
  outline: none;
  border: none;
  width: 80%;
  height: auto;
  ${inputTextStyle};
  color: var(--primary-color-base);
  &::placeholder {
    ${inputTextStyle};
    color: var(--primary-color-200);
  }
`;

export { InputElement };
