import { useState } from "react";

import { Pagination } from "@core/types/data-types";

const usePagination = <T>(paginationData: Pagination<T>) => {
  const [recordsToList] = useState<number>(12);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [firstShownRecord, setFirstShownRecord] = useState<number>(1);
  const [lastShownRecord, setLastShownRecord] = useState<number>(recordsToList);

  const next = (): void => {
    if (currentPage >= 0 && currentPage < paginationData.totalPages) {
      window.scrollTo({ behavior: "smooth", top: 0 });
      setCurrentPage((currentPage) => currentPage + 1);
      if (currentPage >= 0) {
        setFirstShownRecord(
          (firstShownRecord) => firstShownRecord + recordsToList
        );
      }

      setLastShownRecord((lastShownRecord) => lastShownRecord + recordsToList);
    }
  };

  const back = (): void => {
    if (currentPage > 1 && currentPage <= paginationData.totalPages) {
      window.scrollTo({ behavior: "smooth", top: 0 });
      setCurrentPage((currentPage) => currentPage - 1);
      if (currentPage === 0) {
        setFirstShownRecord(1);
      } else {
        setFirstShownRecord(
          (firstShownRecord) => firstShownRecord - recordsToList
        );
      }

      setLastShownRecord((lastShownRecord) => lastShownRecord - recordsToList);
    }
  };

  return {
    recordsToList,
    currentPage,
    firstShownRecord,
    lastShownRecord,
    next,
    back,
  };
};
export default usePagination;
