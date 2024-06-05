import styled from "styled-components";

import { breakpoints } from "@core/constants";

const HomeHeaderContainer = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: var(--spacing-xl);
  position: absolute;
  left: 0;
  right: 0;
  top: 60px;
  margin: auto;
  /* button {
    background-color: var(--primary-color-900);
  } */

  @media (min-width: ${breakpoints.tablet}px) {
    top: 50px;
  }
`;

export { HomeHeaderContainer };
