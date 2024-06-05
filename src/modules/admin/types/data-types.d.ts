type Difficulty = "Basico" | "Intermedio" | "Experto";

interface Answer {
  answerText: string;
  isCorrectAnswer: boolean;
}

interface QuestionFormData {
  name: string;
  questionBody: string;
  answers: Answer[];
  time: number;
  reward: number;
  category: string;
  difficulty: Difficulty;
}

interface CategoryFormData {
  name: string;
}

interface Question extends QuestionFormData {
  id: string;
}
interface Category extends CategoryFormData {
  id: string;
}

interface QuizFormData {
  questions: Question[];
  consolationAward: string;
  isQuizStarted: boolean;
  isQuizFinished: boolean;
  isQuizCompleted: boolean;
  easyQuestions: number;
  mediumQuestions: number;
  expertQuestions: number;
}

interface Quiz extends QuizFormData {
  id: string;
}

interface ConsolationAwardFormData {
  consolationAward: string;
}

export type {
  Difficulty,
  QuestionFormData,
  CategoryFormData,
  Answer,
  Question,
  Category,
  QuizFormData,
  Quiz,
  ConsolationAwardFormData,
};
