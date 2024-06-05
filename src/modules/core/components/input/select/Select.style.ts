import styled from "styled-components";

import { inputTextStyle } from "../input-text/InputText.style";

const SelectElement = styled.select`
  outline: none;
  border: none;
  width: 80%;
  ${inputTextStyle};
  color: var(--primary-color-base);
  appearance: none;
  -webkit-appearance: none;
  -moz-appearance: none;
  cursor: pointer;

  &::-ms-expand {
    display: none;
  }
  transition: all 0.5s ease;
`;

export { SelectElement };
