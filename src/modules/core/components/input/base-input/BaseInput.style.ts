import styled from "styled-components";

import { breakpoints } from "@core/constants";

const InputContainer = styled.div`
  width: 100%;
  justify-self: center;
  height: auto;
  display: flex;
  flex-direction: column;
  gap: var(--spacing-xs);
  justify-content: center;
  align-items: center;

  label[id="input-label"] {
    font-size: var(--font-size-md);
    font-family: var(--primary-font-family);
    font-weight: bold;
    color: var(--primary-color-base);
    text-align: center;
    text-transform: capitalize;
  }

  svg[id="paste-text-button"] {
    width: 24px;
    height: 24px;
    color: var(--primary-color-base);
    cursor: pointer;
    transition: color 0.6s ease;
    &:hover {
      color: var(--primary-color-300);
    }
  }

  @media (min-width: ${breakpoints.tablet}px) {
    label[id="input-label"] {
      font-size: var(--font-size-xl);
    }
    svg[id="paste-text-button"] {
      width: 30px;
      height: 30px;
    }
  }
`;

const InputBody = styled.kbd`
  width: 100%;
  padding: var(--spacing-sm) var(--spacing-md);
  border-radius: var(--radius-sm);
  display: inline-flex;
  gap: var(--spacing-sm);
  justify-content: flex-start;
  align-items: center;
  background-color: var(--white);
  border: solid 4px var(--primary-color-base);
  cursor: pointer;
  position: relative;
  transition: border 0.5s ease;

  div[id="spinner"] {
    width: 40px;
    height: 40px;
    div {
      width: 30px;
      height: 30px;
      border-width: 4px;
    }
  }

  svg {
    color: var(--primary-color-base);
    width: 20px;
    height: 20px;
    transition: transform 0.5s ease;
  }

  &:hover {
    border: 4px solid var(--primary-color-400);
    svg[id="input-icon"] {
      transform: rotate(15deg);
    }
    svg[id="select-arrow"] {
      transform: rotate(-90deg);
    }
  }

  @media (min-width: ${breakpoints.tablet}px) {
    gap: var(--spacing-md);
    svg {
      width: 24px;
      height: 24px;
    }
  }
`;

export { InputContainer, InputBody };
