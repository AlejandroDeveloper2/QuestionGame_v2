import { ArrowLeft, ArrowRight } from "iconoir-react";

import { PaginationProps } from "@core/types/component-types";

import { IconOnlyButton } from "@core/components";

import { PaginationContainer } from "./Pagination.style";

function Pagination({
  firstShownRecord,
  lastShownRecord,
  totalItems,
  next,
  back,
}: PaginationProps): JSX.Element {
  return (
    <PaginationContainer>
      <IconOnlyButton
        Icon={ArrowLeft}
        variant="neutral"
        title="Página anterior"
        type="button"
        onClick={back}
      />
      <p id="pagination-text">
        {firstShownRecord} al {lastShownRecord} de {totalItems} Registros
      </p>
      <IconOnlyButton
        Icon={ArrowRight}
        variant="neutral"
        title="Página siguiente"
        type="button"
        onClick={next}
      />
    </PaginationContainer>
  );
}

export default Pagination;
