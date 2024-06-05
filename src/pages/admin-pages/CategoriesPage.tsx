/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from "react";

import { Category } from "@admin/types/data-types";

import { useLoading, useSearch } from "@core/hooks";
import { useCategoryStore } from "@admin/hooks";

import { Header } from "@core/components";
import { CategoryHeader, CategoryList } from "@admin/components";

const CategoriesPage = (): JSX.Element => {
  const { loading, toggleLoading } = useLoading();
  const { categories, getAllCategories } = useCategoryStore();

  const { searchValue, records, handleSearch } = useSearch<Category>(
    categories,
    "name"
  );

  useEffect(() => {
    if (categories.length === 0) getAllCategories(toggleLoading);
  }, []);

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
    </>
  );
};

export default CategoriesPage;
