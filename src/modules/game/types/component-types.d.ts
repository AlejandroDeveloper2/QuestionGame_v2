import { Answer } from "@admin/types/data-types";
import { AnswerMarkType } from "./data-types";

interface AnswerBoxProps {
  answerId: number;
  answerMark: AnswerMarkType;
  answerData: Answer;
  answerStyles: AnswerOptionStyleProps[];
}

interface AnswerOptionStyleProps {
  background: string;
  bordercolor: string;
  color: string;
}

interface AnswerReviewWindowProps {
  closeModal: () => void;
}

interface CallWillCardModalProps {
  callSecondsDuration: string;
}

interface DividedPopUpProps {
  isPopUpVisible: boolean;
}

export type {
  AnswerBoxProps,
  AnswerOptionStyleProps,
  AnswerReviewWindowProps,
  CallWillCardModalProps,
  DividedPopUpProps,
};
