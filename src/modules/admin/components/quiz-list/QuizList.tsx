import { QuizListProps } from "@admin/types/component-types";

import { QuizCard } from "@admin/components";

import { QuizListContainer } from "./QuizList.style";

const QuizList = ({ children }: QuizListProps): JSX.Element => {
  return <QuizListContainer>{children}</QuizListContainer>;
};

QuizList.Quiz = QuizCard;

export default QuizList;
