import styled from "styled-components";

import { breakpoints } from "@core/constants";

const CategoryHeaderContainer = styled.section`
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

  @media (min-width: ${breakpoints.tablet}px) {
    top: 50px;
  }
`;

export { CategoryHeaderContainer };
