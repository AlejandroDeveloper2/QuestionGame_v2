import styled from "styled-components";

import { breakpoints } from "@core/constants";

const GameHeaderContainer = styled.section`
  width: auto;
  display: inline-flex;
  justify-content: center;
  align-items: center;
  gap: var(--spacing-sm);
  flex-direction: row;

  div[id="title-container"] {
    p {
      font-size: var(--font-size-sm);
      color: var(--primary-color-base);
      font-weight: normal;
      text-align: center;
      white-space: pre-wrap;
      font-family: var(--primary-font-family);
      span {
        font-weight: bold;
      }
    }
  }
  div[id="difficulty-badge"] {
    display: none;
  }

  @media (min-width: ${breakpoints.tablet}px) {
    div[id="difficulty-badge"] {
      display: flex;
    }
  }
`;

export { GameHeaderContainer };
