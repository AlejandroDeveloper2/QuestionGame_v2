import styled from "styled-components";

import { breakpoints } from "@core/constants";

const DialogBackdrop = styled.div<{ isdialogvisible: string }>`
  display: flex;
  align-items: center;
  background-color: var(--overlay-color);
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  left: 0;
  z-index: ${({ isdialogvisible }: { isdialogvisible: string }) =>
    isdialogvisible === "true" ? 50 : -50};
  transition: opacity 0.5s ease;
  opacity: ${({ isdialogvisible }: { isdialogvisible: string }) =>
    isdialogvisible === "true" ? 1 : 0};
`;

const DialogWindow = styled.dialog`
  width: fit-content;
  height: fit-content;
  background-color: var(--white);
  margin: 0 auto;
  padding: var(--spacing-md);
  gap: var(--spacing-sm);
  border-radius: var(--radius-xl);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border-color: var(--orange);

  h2[id="dialog-title"] {
    font-size: var(--font-size-2xl);
    color: var(--orange);
    font-weight: bold;
    font-family: var(--primary-font-family);
    text-align: center;
  }
  @media (min-width: ${breakpoints.tablet}px) {
    h2 [id="dialog-title"] {
      font-size: var(--font-size-3xl);
    }
  }
`;

const Content = styled.section`
  display: grid;
  place-content: center;
  p {
    color: var(--gray);
    font-size: var(--font-size-sm);
    font-weight: normal;
    font-family: var(--primary-font-family);
    text-align: center;
    white-space: pre-wrap;
  }
  @media (min-width: ${breakpoints.tablet}px) {
    p {
      font-size: var(--font-size-md);
    }
  }
`;

const Options = styled.menu`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  gap: var(--spacing-sm);
`;

export { DialogBackdrop, DialogWindow, Content, Options };
