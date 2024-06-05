import styled from "styled-components";

import { breakpoints } from "@core/constants";
import { FieldSetStyle } from "@core/types/data-types";

const FormBody = styled.form`
  width: auto;
  height: auto;
  display: flex;
  overflow: hidden;
  flex-direction: column;
  gap: var(--spacing-sm);
  justify-content: flex-start;
  align-items: center;
  position: relative;

  @media (min-width: ${breakpoints.desktop}px) {
    gap: var(--spacing-md);
  }
`;

const FieldSetContainer = styled.fieldset<FieldSetStyle>`
  width: ${({ width }: FieldSetStyle) => width.sm}%;
  height: auto;
  max-height: 300px;
  overflow-y: auto;
  gap: var(--spacing-sm);
  justify-content: flex-start;
  border: none;
  display: grid;
  grid-template-columns: repeat(auto-fill, 300px);

  @media (min-height: 700px) {
    max-height: 500px;
  }

  @media (min-width: ${breakpoints.tablet}px) {
    width: ${({ width }: FieldSetStyle) => width.md}%;
    padding: var(--spacing-md);
    max-height: 600px;
    grid-template-columns: repeat(auto-fill, 400px);
  }

  @media (min-width: ${breakpoints.desktop}px) {
    gap: var(--spacing-md);
    max-height: 550px;
    width: ${({ width }: FieldSetStyle) => width.lg}px;
    grid-template-columns: repeat(auto-fill, 500px);
  }
`;

export { FormBody, FieldSetContainer };
