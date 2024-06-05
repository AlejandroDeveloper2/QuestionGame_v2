import styled from "styled-components";

import { ModalStyle } from "@core/types/data-types";
import { breakpoints } from "@core/constants";

const ModalOverlay = styled.div<ModalStyle>`
  width: 100vw;
  height: 100%;
  position: fixed;
  background-color: var(--overlay-color);
  display: grid;
  place-content: center;
  top: 0;
  left: 0;
  z-index: ${({ ismodalvisible }: ModalStyle) =>
    ismodalvisible === "true" ? 50 : -50};
  transition: opacity 0.5s ease;
  opacity: ${({ ismodalvisible }: ModalStyle) =>
    ismodalvisible === "true" ? 1 : 0};
`;

const ModalBody = styled.div`
  width: 100%;
  height: auto;
  background-color: var(--white);
  display: flex;
  justify-content: flex-start;
  flex-direction: column;
  align-items: center;
  gap: var(--spacing-xl);
  border-top-right-radius: var(--radius-xl);
  border-top-left-radius: var(--radius-xl);
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  margin: auto;
  z-index: 60;
  padding: var(--spacing-xl) 0;

  svg[id="close-modal"] {
    position: absolute;
    width: 30px;
    height: 30px;
    top: 10px;
    left: 0;
    right: 0;
    margin: auto;
    color: var(--primary-color-base);
    cursor: pointer;
  }

  h1 {
    font-size: var(--font-size-2xl);
    color: var(--gray);
    text-align: center;
    font-weight: bold;
    font-family: var(--primary-font-family);
    margin-top: var(--spacing-xl);
  }

  @media (min-width: ${breakpoints.tablet}px) {
    position: relative;
    gap: var(--spacing-3xl);
    padding: var(--spacing-2xl);
    border-radius: var(--radius-xl);
    bottom: auto;
    left: auto;
    right: auto;
    margin: 0;
    h1 {
      font-size: var(--font-size-3xl);
      margin-top: var(--spacing-4xl);
    }
    width: auto;
    svg[id="close-modal"] {
      top: 10px;
      width: 40px;
      height: 40px;
    }
  }

  @media (min-width: ${breakpoints.desktop}px) {
    gap: var(--spacing-4xl);
  }
`;

export { ModalOverlay, ModalBody };
