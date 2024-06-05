import styled, { css } from "styled-components";

import { breakpoints } from "@core/constants";

export const iconIllustrationStyle = css`
  position: fixed;
  width: 40px;
  height: 40px;
  animation-name: rotate;
  animation-duration: 3s;
  animation-timing-function: ease-out;
  animation-fill-mode: both;
  animation-iteration-count: infinite;
  animation-direction: alternate;
  @media (min-width: ${breakpoints.tablet}px) {
    width: 60px;
    height: 60px;
  }
  @media (min-width: ${breakpoints.desktop}px) {
    width: 70px;
    height: 70px;
  }
  @keyframes rotate {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;

export const iconIllustration1 = css`
  top: 20px;
  left: 20px;
  transform: rotate(25deg);
`;
export const iconIllustration2 = css`
  bottom: 20px;
  right: 20px;
  transform: rotate(-25deg);
`;

export const PageContainer = styled.main`
  width: 100vw;
  height: auto;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: var(--spacing-4xl);
  flex-direction: column;
  background-color: transparent;
  position: relative;
  padding-top: var(--spacing-xl);
  padding-bottom: var(--spacing-xl);
  overflow-x: hidden;

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
`;

export const FormContainer = styled.div`
  width: 300px;
  height: auto;
  border-top: solid 4px var(--primary-color-100);
  padding-top: var(--spacing-2xl);
  display: flex;
  gap: var(--spacing-md);
  justify-content: space-between;
  align-items: center;
  flex-direction: column;
  animation-name: move-up;
  animation-duration: 0.4s;
  animation-timing-function: ease-in;
  animation-delay: 2s;
  h1 {
    font-size: var(--font-size-3xl);
    font-family: var(--secondary-font-family);
    text-align: center;
    text-transform: uppercase;
    color: var(--white);
    font-weight: 400;
  }
  form {
    fieldset {
      div[id="input-container"] {
        width: 300px;
        label {
          color: var(--white);
        }
      }
    }
  }

  @media (min-width: ${breakpoints.tablet}px) {
    width: 400px;
    h1 {
      font-size: var(--font-size-4xl);
    }
    form {
      fieldset {
        div[id="input-container"] {
          width: 400px;
        }
      }
    }
    @media (min-width: ${breakpoints.desktop}px) {
      width: 500px;
      form {
        fieldset {
          div[id="input-container"] {
            width: 500px;
          }
        }
      }
    }

    @keyframes move-up {
      0% {
        transform: translateY(100%);
      }
      100% {
        transform: translateY(0);
      }
    }
  }
`;

export const TitleContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: var(--spacing-sm);
  justify-content: center;
  align-items: center;

  h1 {
    font-size: var(--font-size-3xl);
    font-family: var(--secondary-font-family);
    font-weight: 400;
    text-align: center;
    text-transform: uppercase;
    color: var(--gray);
  }
  @media (min-width: ${breakpoints.tablet}px) {
    h1 {
      font-size: var(--font-size-4xl);
    }
  }
`;
