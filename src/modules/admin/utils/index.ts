import { Answer, Difficulty, Question, Quiz } from "@admin/types/data-types";

export const getRandomQuestionsPerCategory = (
  questions: Question[],
  filter: Difficulty,
  questionsQuantity: number
): Question[] => {
  let question: Question, randomIndex: number;
  const shuffledQuestions: Question[] = questions.filter(
    (question) => question.difficulty === filter
  );

  for (let i = shuffledQuestions.length - 1; i > 0; i--) {
    randomIndex = Math.floor(Math.random() * (i + 1));
    question = shuffledQuestions[i];
    shuffledQuestions[i] = shuffledQuestions[randomIndex];
    shuffledQuestions[randomIndex] = question;
  }
  const randomQuestions: Question[] = shuffledQuestions.slice(
    0,
    questionsQuantity
  );
  return randomQuestions;
};

export const shuffleQuestionsAnswer = (
  randomQuestions: Question[]
): Question[] => {
  let answer: Answer, randomIndex: number;

  const newRandomQuestions = randomQuestions.map((question: Question) => {
    const shuffleAnswers: Answer[] = [...question.answers];

    for (let i = shuffleAnswers.length - 1; i > 0; i--) {
      randomIndex = Math.floor(Math.random() * (i + 1));
      answer = shuffleAnswers[i];
      shuffleAnswers[i] = shuffleAnswers[randomIndex];
      shuffleAnswers[randomIndex] = answer;
    }
    return { ...question, answers: shuffleAnswers };
  });

  return newRandomQuestions;
};

export const getRandomQuestions = (
  questions: Question[],
  quizSettings: Pick<
    Quiz,
    "easyQuestions" | "mediumQuestions" | "expertQuestions"
  >
): Question[] => {
  const { easyQuestions, mediumQuestions, expertQuestions } = quizSettings;
  const basicRandomQuestions: Question[] = getRandomQuestionsPerCategory(
    questions,
    "Basico",
    easyQuestions //5
  );
  const intermediateRandomQuestions: Question[] = getRandomQuestionsPerCategory(
    questions,
    "Intermedio",
    mediumQuestions //5
  );
  //46
  const expertRandomQuestions: Question[] = getRandomQuestionsPerCategory(
    questions,
    "Experto",
    expertQuestions
  );
  const finalRandomQuestions: Question[] = shuffleQuestionsAnswer(
    basicRandomQuestions.concat(
      intermediateRandomQuestions,
      expertRandomQuestions
    )
  );
  return finalRandomQuestions;
};
