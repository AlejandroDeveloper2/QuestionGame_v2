import styled from "styled-components";

import { breakpoints } from "@core/constants";

const AdminQuizControlsContainer = styled.div`
  width: 100%;
  height: auto;
  gap: var(--spacing-md);
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  overflow-y: auto;
  background-color: var(--white);
  padding-top: var(--spacing-sm);
  padding-bottom: 64px;
  padding-left: var(--spacing-sm);
  padding-right: var(--spacing-sm);
  border-radius: var(--radius-sm);
  margin-top: var(--spacing-sm);
  @media (min-width: ${breakpoints.tablet}px) {
    overflow-y: hidden;
    width: 95%;
    max-height: 800px;
    gap: var(--spacing-xl);
    padding-bottom: var(--spacing-2xl);
  }

  @media (min-width: ${breakpoints.desktop}px) {
    width: 920px;
  }
`;

const QuestionInfoContainer = styled.div`
  width: 100%;
  gap: var(--spacing-sm);
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;

  @media (min-width: ${breakpoints.tablet}px) {
    gap: var(--spacing-md);
  }
`;

const AdminQuizControlsFooter = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  gap: var(--spacing-sm);
  justify-content: center;
  background-color: var(--white);
  padding: var(--spacing-sm);
  border-radius: var(--radius-sm);
  button {
    span {
      display: none;
    }
  }
  @media (min-width: ${breakpoints.tablet}px) {
    button {
      span {
        display: block;
      }
    }
  }
`;

const AnswersWildCardContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: var(--spacing-xs);

  @media (min-width: ${breakpoints.tablet}px) {
    flex-direction: row-reverse;
    gap: var(--spacing-md);
  }
`;

export {
  AdminQuizControlsContainer,
  QuestionInfoContainer,
  AdminQuizControlsFooter,
  AnswersWildCardContainer,
};
