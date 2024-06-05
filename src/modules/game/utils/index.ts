import { Answer, Question } from "@admin/types/data-types";
import { Game, Match, MatchResultType } from "@game/types/data-types";

import { answerStyleData } from "@game/constants";

import {
  generateUnicId,
  increaseCorrectAnswers,
  manageAccumulatedEarn,
  validateDividedWildCard,
  validateIsNewAttempt,
} from "@game/helpers";

export const createMatches = (quizQuestions: Question[]): Match[] => {
  const matches: Match[] = quizQuestions.map<Match>((question, index) => {
    return {
      id: generateUnicId(),
      currentQuestionIndex: index,
      currentQuestion: question,
      matchResult: "EnEspera",
      timerValue: question.time,
      isDividedWildCardActive: false,
      isCallWildCardActive: false,
      isNewAttempt: false,
      isMatchPaused: true,
      selectedAnswers: 0,
      answerStyles: answerStyleData,
    };
  });
  return matches;
};

export const answerQuestion = (
  currentQuestion: Question,
  selectedAnswer: Answer | null
): MatchResultType => {
  const correctAnswer: Answer | undefined = currentQuestion?.answers.find(
    (answer) => answer.isCorrectAnswer
  );

  if (selectedAnswer) {
    const matchResult: MatchResultType =
      correctAnswer === selectedAnswer ? "Correcta" : "Incorrecta";
    return matchResult;
  }

  return "SinResponder";
};

export const giveNewAttempt = (
  questionBank: Question[],
  quizQuestions: Question[]
): Question => {
  const filteredQuestions = questionBank.filter(
    (question) => question.difficulty === "Experto"
  );
  const randomIndex = Math.floor(Math.random() * filteredQuestions.length);
  const randomExpertQuestion = filteredQuestions.filter(
    (_, i) => i == randomIndex
  )[0];

  if (quizQuestions.includes(randomExpertQuestion)) {
    return giveNewAttempt(questionBank, quizQuestions);
  }
  return randomExpertQuestion;
};

export const getGameStatus = (
  currentGame: Game,
  currentMatch: Match
): Partial<Game> => {
  if (currentMatch.matchResult === "Correcta")
    return {
      ...currentGame,
      correctAnswers: increaseCorrectAnswers(currentGame.correctAnswers),
      accumulatedEarn: manageAccumulatedEarn(
        "increase",
        currentGame.accumulatedEarn,
        validateIsNewAttempt({
          isNewAttempt: currentMatch.isNewAttempt,
          currentQuestion: currentMatch.currentQuestion,
        })
      ),
    };

  if (currentMatch.matchResult === "Incorrecta")
    return {
      ...currentGame,
      incorrectAnswers: validateDividedWildCard(currentGame.incorrectAnswers, {
        selectedAnswers: currentMatch.selectedAnswers,
        isDividedWildCardActive: currentMatch.isDividedWildCardActive,
      }),
    };

  return { ...currentGame };
};
