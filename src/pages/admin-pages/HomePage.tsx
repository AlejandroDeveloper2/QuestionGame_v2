/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from "react";

import { Difficulty, Question } from "@admin/types/data-types";

import { useLoading, usePagination, useSearch, useTapNav } from "@core/hooks";
import { useGameStore } from "@game/hooks";
import { useQuestionStore, useQuizAdminStore } from "@admin/hooks";

import { Header, Pagination } from "@core/components";
import { HomeHeader, QuestionList } from "@admin/components";

const HomePage = (): JSX.Element => {
  const { loading, toggleLoading } = useLoading();
  const { questions, pagination, getQuestions } = useQuestionStore();
  const { getAllQuizzes } = useQuizAdminStore();
  const { getAllGames } = useGameStore();

  const { searchValue, records, handleSearch } = useSearch<Question>(
    questions,
    "name"
  );
  const { selectedTap, toggleTap } = useTapNav<Difficulty>("Todas");
  const {
    recordsToList,
    currentPage,
    firstShownRecord,
    lastShownRecord,
    next,
    back,
  } = usePagination<Question>(pagination);

  useEffect(() => {
    if (searchValue === "") {
      getQuestions(
        toggleLoading,
        currentPage,
        recordsToList,
        selectedTap !== "Todas"
          ? {
              filterKey: "difficulty",
              filterValue: selectedTap,
            }
          : undefined
      );
    } else {
      getQuestions(toggleLoading, currentPage, recordsToList);
    }
  }, [selectedTap, currentPage, searchValue]);

  useEffect(() => {
    getAllQuizzes();
  }, []);

  useEffect(() => {
    getAllGames();
  }, []);

  return (
    <>
      <Header
        style={{
          height: { sm: 344, md: 300, lg: 300 },
          direction: { sm: "column", md: "column", lg: "column" },
        }}
      >
        <HomeHeader searchValue={searchValue} handleSearch={handleSearch} />
      </Header>
      <QuestionList
        records={records}
        loading={loading}
        selectedTap={selectedTap}
        toggleTap={toggleTap}
      />
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

export default HomePage;
