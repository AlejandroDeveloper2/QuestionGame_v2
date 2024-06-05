import { breakpoints } from "@core/constants";
import styled from "styled-components";

const QuizCardContainer = styled.div`
  width: 100%;
  height: auto;
  padding: var(--spacing-xl) var(--spacing-2xl);
  background-color: var(--white);
  border-radius: var(--radius-xl);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: var(--spacing-md);

  h2[id="card-quiz-title"],
  h3 {
    font-size: var(--font-size-3xl);
    font-family: var(--primary-font-family);
    font-weight: bold;
    color: var(--gray);
    text-align: center;
    text-transform: capitalize;
    text-overflow: ellipsis;
  }

  h3 {
    font-size: var(--font-size-xl);
    color: var(--primary-color-base);
  }

  @media (min-width: ${breakpoints.tablet}px) {
    width: 80%;
  }

  @media (min-width: ${breakpoints.desktop}px) {
    width: 40%;
  }
`;

const QuizDetails = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: var(--spacing-sm);

  ul {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
    gap: var(--spacing-sm);

    li {
      list-style: none;
      display: block;
    }
  }
`;

const CopyCodeSection = styled.div`
  display: inline-flex;
  gap: var(--spacing-sm);
  justify-content: center;
  align-items: center;
  border: 2px solid var(--light-gray);
  padding: var(--spacing-md);
  border-radius: var(--radius-xl);
  strong {
    display: flex;
    flex-direction: column;
    font-size: var(--font-size-xl);
    font-family: var(--primary-font-family);
    font-weight: lighter;
    color: var(--gray);
    text-align: left;
    text-overflow: ellipsis;
    span {
      font-weight: bold;
      color: var(--primary-color-base);
      margin-right: var(--spacing-sm);
    }
  }
`;

export { QuizCardContainer, QuizDetails, CopyCodeSection };
