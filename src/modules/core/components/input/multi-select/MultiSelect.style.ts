import styled, { css } from "styled-components";
import { NavArrowDown } from "iconoir-react";

import { breakpoints } from "@core/constants";

const textStyle = css`
  text-align: center;
  font-weight: bold;
  text-transform: capitalize;
  white-space: nowrap;
  font-family: var(--primary-font-family);
`;

const Arrow = styled(NavArrowDown)`
  transition: all ease 0.5s;
  cursor: pointer;
  &:hover {
    background-color: var(primary-color-200);
  }
`;

const Label = styled.label`
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  cursor: pointer;
`;

const MultiSelectList = styled.ul`
  width: 100%;
  display: inline-flex;
  gap: var(--spacing-xs);
  justify-content: flex-start;
  align-items: center;
  overflow-x: auto;
  position: relative;

  li {
    display: block;
    list-style: none;
  }
`;

const SelectedOption = styled.div`
  height: 60px;
  padding: 0 var(--spacing-sm);
  border-radius: var(--radius-sm);
  background-color: var(--primary-color-base);
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: var(--spacing-sm);
  overflow: hidden;
  position: relative;

  svg {
    width: 20px;
    height: 20px;
    color: var(--white);
    transition: transform ease 0.5s;
    cursor: pointer;
    &:hover {
      transform: rotate(180deg);
    }
  }

  span {
    font-size: var(--font-size-xs);
    color: var(--white);
    ${textStyle};
  }

  @media (min-width: ${breakpoints.tablet}px) {
    span {
      font-size: var(--font-size-sm);
    }
    svg {
      width: 24px;
      height: 24px;
    }
  }
`;

const DropdownMenu = styled.menu<{
  isdropdownvisible: string;
  numrows: number;
  selectedoptions: number;
}>`
  width: 100%;
  border-bottom-left-radius: var(--radius-sm);
  border-bottom-left-radius: var(--radius-sm);
  background-color: var(--white);
  display: grid;
  max-height: 300px;
  grid-template-rows: repeat(
    ${({ numrows }: { numrows: number }) => numrows},
    1fr
  );
  padding-bottom: var(--spacing-xs);
  position: absolute;
  top: 0;
  left: 0;
  z-index: ${({ isdropdownvisible }: { isdropdownvisible: string }) =>
    isdropdownvisible === "true" ? 5 : -5};
  opacity: ${({ isdropdownvisible }: { isdropdownvisible: string }) =>
    isdropdownvisible === "true" ? 1 : 0};
  transform: ${({
    isdropdownvisible,
    selectedoptions,
  }: {
    isdropdownvisible: string;
    selectedoptions: number;
  }) =>
    isdropdownvisible === "true"
      ? selectedoptions > 0
        ? "translateY(120px)"
        : "translateY(60px)"
      : "translateY(0)"};
  transition: all 0.6s ease;
  box-shadow: 0 10px 10px var(--box-shadow-color);
  overflow-x: hidden;
  overflow-y: auto;

  button {
    cursor: pointer;
    width: 100%;
    padding: var(--spacing-sm);
    display: grid;
    place-content: center;
    background-color: transparent;
    transition: background-color ease 0.5s;
    border: none;
    &:hover {
      background-color: var(--light-gray);
    }
    span {
      font-size: var(--font-size-sm);
      color: var(--gray);
      ${textStyle};
    }
    @media (min-width: ${breakpoints.tablet}px) {
      span {
        font-size: var(--font-size-md);
      }
    }
  }
  @media (min-width: ${breakpoints.tablet}px) {
    max-height: 350px;
  }
`;

export { Arrow, Label, MultiSelectList, SelectedOption, DropdownMenu };
