/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from "react";

import { Question } from "@admin/types/data-types";

import { useLoading, useSearch } from "@core/hooks";
import { useQuestionStore, useQuizAdminStore } from "@admin/hooks";

import { Header } from "@core/components";
import { HomeHeader, QuestionList } from "@admin/components";

const HomePage = (): JSX.Element => {
  const { loading, toggleLoading } = useLoading();
  const { questions, getAllQuestions } = useQuestionStore();
  const { getAllQuizzes } = useQuizAdminStore();

  const { searchValue, records, handleSearch } = useSearch<Question>(
    questions,
    "name"
  );

  useEffect(() => {
    if (questions.length === 0) getAllQuestions(toggleLoading);
  }, []);

  useEffect(() => {
    getAllQuizzes();
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
      <QuestionList records={records} loading={loading} />
    </>
  );
};

export default HomePage;
