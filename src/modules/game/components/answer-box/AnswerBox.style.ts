import styled from "styled-components";

import { breakpoints } from "@core/constants";
import { AnswerOptionStyleProps } from "@game/types/component-types";

const AnswerBody = styled.button<AnswerOptionStyleProps>`
  width: 100%;
  height: auto;
  padding: var(--spacing-md);
  border-radius: var(--radius-sm);
  border: 4px ${({ bordercolor }: AnswerOptionStyleProps) => bordercolor} solid;
  position: relative;
  display: inline-flex;
  justify-content: flex-start;
  align-items: center;
  gap: var(--spacing-md);
  background-color: ${({ background }: AnswerOptionStyleProps) =>
    background}; //var(--primary-color-100);
  transition: all 0.6s ease;
  opacity: ${({ disabled }) => (disabled ? 0.7 : 1)};
  p {
    font-family: var(--primary-font-family);
    font-style: normal;
    font-weight: 900;
    font-size: var(--font-size-3xl);
    color: ${({ color }: AnswerOptionStyleProps) => color};
    text-align: center;
  }
  cursor: pointer;
  &:hover {
    border-color: var(--white);
    background-color: var(--primary-color-200);
  }
  &:hover > div {
    transform: rotate(15deg);
  }

  @media (min-width: ${breakpoints.tablet}px) {
    p {
      font-size: var(--font-size-4xl);
    }
  }
`;

const AnswerMarkBox = styled.div`
  width: 50px;
  height: 50px;
  border-radius: var(--radius-sm);
  background-color: var(--primary-color-base);
  display: grid;
  place-content: center;
  transition: transform ease 0.6s;

  span {
    font-family: var(--primary-font-family);
    font-weight: bold;
    font-size: var(--font-size-3xl);
    color: var(--white);
    text-align: center;
    vertical-align: center;
  }

  @media (min-width: ${breakpoints.tablet}px) {
    font-size: var(--font-size-4xl);
  }
  @media (min-width: ${breakpoints.desktop}px) {
    width: 60px;
    height: 60px;
  }
`;

export { AnswerBody, AnswerMarkBox };
