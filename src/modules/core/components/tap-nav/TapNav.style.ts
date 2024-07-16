import styled from "styled-components";

import { breakpoints } from "@core/constants";

const TapButton = styled.button<{ selected: string }>`
  width: auto;
  height: auto;
  padding: var(--spacing-sm) var(--spacing-md);
  background-color: ${({ selected }: { selected: string }) =>
    selected === "true" ? "var(--primary-color-base)" : "transparent"};
  border-radius: var(--radius-sm);
  border: 4px solid var(--primary-color-base);
  display: flex;
  gap: var(--spacing-xs);
  justify-content: center;
  align-items: center;
  cursor: pointer;
  transition: all ease 0.5s;
  overflow: hidden;
  &:hover {
    svg {
      transform: rotate(45deg);
    }
  }

  svg {
    width: 30px;
    height: 30px;
    color: ${({ selected }: { selected: string }) =>
      selected === "true" ? "var(--white)" : "var(--primary-color-base)"};
    transition: transform ease 0.5s;
  }
  span {
    display: none;
    color: ${({ selected }: { selected: string }) =>
      selected === "true" ? "var(--white)" : "var(--primary-color-base)"};
    font-size: var(--font-size-xs);
    font-weight: bold;
    white-space: pre-wrap;
    text-transform: capitalize;
    font-family: var(--primary-font-family);
  }

  @media (min-width: ${breakpoints.tablet}px) {
    span {
      font-size: var(--font-size-sm);
      display: block;
    }
  }

  @media (min-width: ${breakpoints.desktop}px) {
    svg {
      width: 40px;
      height: 40px;
    }
    span {
      font-size: var(--font-size-md);
    }
  }
`;

const Nav = styled.nav`
  width: auto;
  height: auto;
  padding: var(--spacing-sm) var(--spacing-xl);
  background-color: var(--white);
  box-shadow: 0 0 10px var(--box-shadow-color);
  border-radius: var(--radius-sm);
  display: grid;
  place-content: center;

  ul {
    display: inline-flex;
    justify-content: center;
    align-items: center;
    gap: var(--spacing-sm);
    flex-direction: row;
    li {
      list-style: none;
      display: block;
    }
  }

  @media (min-width: ${breakpoints.tablet}px) {
    padding: var(--spacing-md) var(--spacing-xl);
  }

  @media (min-width: ${breakpoints.desktop}px) {
    padding: var(--spacing-xl) var(--spacing-2xl);
  }
`;

export { TapButton, Nav };
