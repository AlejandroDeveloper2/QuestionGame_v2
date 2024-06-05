import styled from "styled-components";

import { breakpoints } from "@core/constants";

const PopUpContainer = styled.div<{ positionx: number }>`
  width: 100px;
  padding: var(--spacing-md);
  position: fixed;
  opacity: ${({ positionx }: { positionx: number }) => positionx};
  z-index: ${({ positionx }: { positionx: number }) =>
    positionx === 1 ? 10 : -10};
  top: 10px;
  right: 10px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: var(--spacing-sm);
  background-color: var(--light-gray);
  border-radius: var(--radius-sm);
  box-shadow: 0 0 10px var(--box-shadow-color);
  transition: all ease 0.6s;
  animation: vibrate 1s linear infinite alternate both;
  svg {
    color: var(--primary-color-base);
    width: 40px;
    height: 40px;
  }
  p {
    display: none;
  }
  p,
  span {
    font-family: var(--primary-font-family);
    font-size: var(--font-size-sm);
    color: var(--primary-color-base);
    font-weight: 500;
    text-transform: wrap;
    text-align: center;
    text-transform: capitalize;
  }
  span {
    color: var(--primary-color-400);
    font-size: var(--font-size-xl);
    font-weight: 800;
  }

  @media (min-width: ${breakpoints.tablet}px) {
    width: 140px;
    top: auto;
    bottom: 15%;
    p {
      display: block;
      font-size: var(--font-size-md);
    }
    span {
      font-size: var(--font-size-2xl);
    }
  }
  @keyframes vibrate {
    0% {
      transform: scale(0.9);
    }
    100% {
      transform: scale(1);
    }
  }
`;

export { PopUpContainer };
