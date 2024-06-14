import { Quiz, QuizFormData } from "@admin/types/data-types";
import { ServerResponse } from "@core/types/data-types";

import { client } from "@config/pocketbase";

class QuizService {
  constructor() {}

  public async createQuiz(newQuiz: QuizFormData): Promise<Quiz> {
    let result: Quiz;
    try {
      result = await client
        .collection<Quiz>("quiz_v2")
        .create(
          {
            ...newQuiz,
            questions: [],
            consolationAward: "",
            isQuizStarted: false,
            isQuizFinished: false,
            isQuizCompleted: false,
          },
          { requestKey: null }
        );
    } catch (e: unknown) {
      const parsedError = e as ServerResponse;
      throw new Error(
        (parsedError.message = "¡Ha ocurrido un error al crear el quiz!")
      );
    }
    return result;
  }

  public async getAllQuizzes(): Promise<Quiz[]> {
    let result: Quiz[];
    try {
      result = await client.collection<Quiz[]>("quiz_v2").getFullList();
    } catch (e: unknown) {
      const parsedError = e as ServerResponse;
      throw new Error(
        (parsedError.message = "¡Ha ocurrido un error al obtener los quizes!")
      );
    }
    return result;
  }

  public async getQuiz(quizId: string): Promise<Quiz> {
    let result: Quiz;
    try {
      result = await client
        .collection<Quiz>("quiz_v2")
        .getOne(quizId, { requestKey: null });
    } catch (e: unknown) {
      const parsedError = e as ServerResponse;
      throw new Error(
        (parsedError.message = "¡Ha ocurrido un error al obtener el quiz!")
      );
    }
    return result;
  }

  public async updateQuizStatus(
    quizId: string,
    updatedPartQuiz: Partial<Quiz>,
    errorMessage: string
  ): Promise<Quiz> {
    let result: Quiz;
    try {
      result = await client
        .collection<Quiz>("quiz_v2")
        .update(quizId, updatedPartQuiz);
    } catch (e: unknown) {
      const parsedError = e as ServerResponse;
      throw new Error((parsedError.message = errorMessage));
    }
    return result;
  }

  public async deleteQuiz(quizId: string): Promise<void> {
    try {
      await client.collection("quiz_v2").delete(quizId);
    } catch (e: unknown) {
      const parsedError = e as ServerResponse;
      throw new Error(
        (parsedError.message = "¡Ha ocurrido un error al eliminar el quiz!")
      );
    }
  }
}

export default QuizService;
