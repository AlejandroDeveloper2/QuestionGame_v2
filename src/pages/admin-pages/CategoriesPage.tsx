/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from "react";

import { Category } from "@admin/types/data-types";

import { useLoading, usePagination, useSearch } from "@core/hooks";
import { useCategoryStore } from "@admin/hooks";

import { Header, Pagination } from "@core/components";
import { CategoryHeader, CategoryList } from "@admin/components";

const CategoriesPage = (): JSX.Element => {
  const { loading, toggleLoading } = useLoading();
  const { categories, pagination, getCategories } = useCategoryStore();

  const { searchValue, records, handleSearch } = useSearch<Category>(
    categories,
    "name"
  );

  const {
    recordsToList,
    currentPage,
    firstShownRecord,
    lastShownRecord,
    next,
    back,
  } = usePagination<Category>(pagination);

  useEffect(() => {
    if (searchValue === "") {
      getCategories(toggleLoading, currentPage, recordsToList);
    } else getCategories(toggleLoading, 1, 10000);
  }, [currentPage, searchValue]);

  return (
    <>
      <Header
        style={{
          height: { sm: 344, md: 300, lg: 300 },
          direction: { sm: "column", md: "column", lg: "column" },
        }}
      >
        <CategoryHeader searchValue={searchValue} handleSearch={handleSearch} />
      </Header>
      <CategoryList records={records} loading={loading} />
      <Pagination
        firstShownRecord={firstShownRecord}
        lastShownRecord={lastShownRecord}
        totalItems={pagination.totalItems}
        back={back}
        next={next}
      />
    </>
  );
};

export default CategoriesPage;
