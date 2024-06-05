import styled from "styled-components";

import { breakpoints } from "@core/constants";

const QuizListContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: var(--spacing-xl);
  padding-left: var(--spacing-sm);
  padding-right: var(--spacing-sm);
  padding-bottom: 80px;
  overflow-x: hidden;

  @media (min-width: ${breakpoints.tablet}px) {
    width: 624px;
    overflow-x: visible;
  }
  @media (min-width: ${breakpoints.desktop}px) {
    width: 1300px;
    /* grid-template-columns: repeat(3, 1fr); */
  }
`;

export { QuizListContainer };
