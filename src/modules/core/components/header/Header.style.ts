import styled from "styled-components";

import { breakpoints } from "@core/constants";
import { HeaderStyle } from "@core/types/data-types";

const HeaderContainer = styled.header<HeaderStyle>`
  width: 100%;
  height: ${({ height }: HeaderStyle) => height.sm}px;
  padding: var(--spacing-4xl) var(--spacing-3xl);
  border-bottom-left-radius: var(--radius-xl);
  border-bottom-right-radius: var(--radius-xl);
  background-color: var(--white);
  display: flex;
  flex-direction: ${({ direction }: HeaderStyle) => direction.sm};
  align-items: center;
  justify-content: center;
  gap: var(--spacing-xl);
  position: relative;
  overflow-y: visible;

  div[id="input-container"] {
    width: 300px;
  }
  div[id="difficulty-badge"] {
    position: absolute;
    top: 5px;
    left: 0;
    right: 0;
    margin: 0 auto;
    width: 60px;
    height: 40px;
    span {
      display: none;
    }
  }

  button[type="button"] {
    position: absolute;
    top: 20px;
    right: 20px;
    z-index: 10;
  }

  @media (min-width: ${breakpoints.tablet}px) {
    height: ${({ height }: HeaderStyle) => height.md}px;
    flex-direction: ${({ direction }: HeaderStyle) => direction.md};
    div[id="input-container"] {
      width: 400px;
    }
    div[id="difficulty-badge"] {
      width: auto;
      height: auto;
      right: auto;
      top: 10px;
      left: 10px;
    }
  }

  @media (min-width: ${breakpoints.desktop}px) {
    div[id="difficulty-badge"] {
      span {
        display: block;
      }
    }
    height: ${({ height }: HeaderStyle) => height.lg}px;
    flex-direction: ${({ direction }: HeaderStyle) => direction.md};
  }
`;

export { HeaderContainer };
