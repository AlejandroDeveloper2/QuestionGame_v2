import styled from "styled-components";

import { breakpoints } from "@core/constants";

import { QuestionOptions } from "../quiz-options/QuizOptions.style";

export const AnswerOptions = styled(QuestionOptions)`
  flex-direction: column;
  menu {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: var(--spacing-xs);
  }
  p {
    font-size: var(--font-size-md);
    color: var(--gray);
    text-align: center;
    text-transform: capitalize;
    font-weight: bold;
    font-family: var(--primary-font-family);
  }

  @media (min-width: ${breakpoints.tablet}px) {
    menu {
      gap: var(--spacing-sm);
    }
    p {
      font-size: var(--font-size-xl);
    }
  }
`;
