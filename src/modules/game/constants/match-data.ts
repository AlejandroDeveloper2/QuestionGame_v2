import { Match } from "@game/types/data-types";
import { answerStyleData } from "./answer-style-data";

export const initialMatchData: Match = {
  id: "",
  currentQuestionIndex: 0,
  currentQuestion: {
    id: "",
    name: "",
    questionBody: "",
    answers: [],
    time: 0,
    reward: 0,
    category: "",
    difficulty: "Basico",
  },
  matchResult: "EnEspera",
  timerValue: 0,
  isDividedWildCardActive: false,
  isCallWildCardActive: false,
  isNewAttempt: false,
  isMatchPaused: true,
  selectedAnswers: 0,
  answerStyles: answerStyleData,
};
