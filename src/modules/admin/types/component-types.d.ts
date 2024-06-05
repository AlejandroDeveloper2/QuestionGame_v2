import { Loading } from "@core/types/data-types";
import { IconType } from "@core/types/component-types";
import { Question, Category, Quiz, Answer } from "./data-types";

type FormMode = "edit" | "add";

interface QuestionFormProps {
  mode: FormMode;
  closeModal: () => void;
}

interface CategoryFormProps extends QuestionFormProps {}

interface AnswerFormProps {
  addOption: (option: Answer) => void;
  toggleForm: () => void;
}

interface HomeHeaderProps {
  searchValue: string;
  handleSearch: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

interface CategoryHeaderProps extends HomeHeaderProps {}

interface QuestionListProps {
  records: Question[];
  loading: Loading;
}

interface CategoryListProps extends Pick<QuestionListProps, "loading"> {
  records: Category[];
}

interface CardListProps {
  children: React.ReactNode | React.ReactNode[];
}

interface CardProps extends CardListProps {
  title: string;
  actions: {
    openEditModal: () => void;
    deleteAction: () => void;
  };
}

interface CardItemProps<T> {
  Icon: IconType;
  itemTitle: string;
  itemValue: T;
}

interface QuizListProps extends CardListProps {}

interface QuizCardProps {
  quiz: Quiz;
}

interface ConsolationAwardFormProps {
  closeModal: () => void;
}

export type {
  FormMode,
  QuestionFormProps,
  CategoryFormProps,
  AnswerFormProps,
  HomeHeaderProps,
  CategoryHeaderProps,
  QuestionListProps,
  CategoryListProps,
  CardListProps,
  CardProps,
  CardItemProps,
  QuizListProps,
  QuizCardProps,
  ConsolationAwardFormProps,
};
