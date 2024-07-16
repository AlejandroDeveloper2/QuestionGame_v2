import styled from "styled-components";

import { breakpoints } from "@core/constants";

const PaginationContainer = styled.menu`
  width: 100%;
  justify-content: space-between;
  align-items: center;
  display: inline-flex;
  padding: var(--spacing-xl) var(--spacing-sm);
  margin-bottom: 80px;
  border-top: 2px solid var(--white);
  background-color: none;

  p[id="pagination-text"] {
    color: var(--white);
    font-size: var(--font-size-xs);
    text-align: center;
    white-space: pre-wrap;
    text-transform: capitalize;
    font-weight: 500;
    font-family: var(--primary-font-family);
  }

  @media (min-width: ${breakpoints.tablet}px) {
    width: 624px;
    p {
      font-size: var(--font-size-sm);
    }
  }
  @media (min-width: ${breakpoints.desktop}px) {
    width: 1098px;
    p {
      font-size: var(--font-size-md);
    }
  }
`;

export { PaginationContainer };
