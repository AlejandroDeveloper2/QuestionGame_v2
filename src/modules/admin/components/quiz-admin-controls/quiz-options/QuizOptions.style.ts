import styled from "styled-components";

const QuestionInfoContainer = styled.div`
  width: 100%;
  gap: var(--spacing-sm);
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
`;

const QuestionOptions = styled(QuestionInfoContainer)`
  flex-direction: row;
  flex-wrap: wrap;
`;

export { QuestionInfoContainer, QuestionOptions };
