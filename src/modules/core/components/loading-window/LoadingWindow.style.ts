import styled from "styled-components";

import { LoadingWindowStyle, Size } from "@core/types/data-types";
import { breakpoints } from "@core/constants";

import {
  iconIllustration1,
  iconIllustration2,
  iconIllustrationStyle,
} from "@core/styles/GlobalStyles.style";

const LoadingWindowContainer = styled.div<LoadingWindowStyle>`
  width: 100vw;
  height: 100vh;
  background-image: var(--bg-color);
  background-repeat: no-repeat;
  background-attachment: fixed;
  background-size: cover;
  display: grid;
  place-content: center;
  position: fixed;
  top: 0;
  left: 0;
  svg[id="figure-1"],
  svg[id="figure-2"] {
    ${iconIllustrationStyle}
  }
  svg[id="figure-1"] {
    ${iconIllustration1}
  }
  svg[id="figure-2"] {
    ${iconIllustration2}
  }
  opacity: ${({ opacity }: LoadingWindowStyle) => opacity};
  transition: opacity 0.6s ease;
  z-index: ${({ isloading }: LoadingWindowStyle) =>
    isloading === "false" ? -200 : 200};
`;

const Content = styled.div`
  width: auto;
  height: auto;
  gap: var(--spacing-sm);
  flex-direction: column;
  display: flex;
  justify-content: center;
  align-items: center;

  @media (min-width: ${breakpoints.tablet}px) {
    gap: var(--spacing-xl);
  }
`;

const logoDimension: Size = {
  sm: 200,
  md: 300,
  lg: 350,
};

export { LoadingWindowContainer, Content, logoDimension };
