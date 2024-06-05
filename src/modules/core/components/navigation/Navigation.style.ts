import styled from "styled-components";
import { Link } from "react-router-dom";

import { breakpoints } from "@core/constants";
import { LinkStyle } from "@core/types/data-types";

const Nav = styled.nav`
  width: 100%;
  border-top-right-radius: var(--radius-xl);
  border-top-left-radius: var(--radius-xl);
  background-color: var(--white);
  padding: var(--spacing-sm) var(--spacing-4xl);
  display: inline-flex;
  justify-content: center;
  align-items: center;
  gap: var(--spacing-sm);
  box-shadow: -4px 0 10px var(--box-shadow-color);
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  margin: auto;
  z-index: 10;

  @media (min-width: ${breakpoints.desktop}px) {
    width: 744px;
  }
`;

const ItemLink = styled(Link)<LinkStyle>`
  width: 60px;
  height: 60px;
  display: inline-flex;
  justify-content: center;
  align-items: center;
  background-color: var(--white);
  border-radius: var(--radius-sm);
  box-shadow: 0 0 10px var(--box-shadow-color);
  text-decoration: none;
  span {
    text-transform: capitalize;
    text-align: center;
    font-size: var(--font-size-sm);
    font-family: var(--primary-font-family);
    font-weight: bold;
    display: none;
    color: ${({ color }: LinkStyle) => color};
    transition: all ease 0.5s;
  }
  svg {
    color: ${({ color }: LinkStyle) => color};
    width: 20px;
    height: 20px;
    transition: transform ease 0.5s;
  }
  &:hover {
    svg {
      color: var(--primary-color-base);
      transform: scale(1.1);
    }
    span {
      color: var(--primary-color-base);
    }
  }
  @media (min-width: ${breakpoints.tablet}px) {
    width: 140px;
    height: 60px;
    gap: var(--spacing-xs);
    span {
      display: block;
    }
    svg {
      width: 24px;
      height: 24px;
    }
  }
  @media (min-width: ${breakpoints.desktop}px) {
    width: 160px;
  }
`;

export { Nav, ItemLink };
