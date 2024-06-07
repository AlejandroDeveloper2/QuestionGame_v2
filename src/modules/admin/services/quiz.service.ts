import { Quiz, QuizFormData } from "@admin/types/data-types";
import { ServerResponse } from "@core/types/data-types";

import { client } from "@config/pocketbase";

class QuizService {
  constructor() {}

  public async createQuiz(newQuiz: QuizFormData): Promise<Quiz> {
    let result: Quiz;
    try {
      result = await client.collection<Quiz>("quiz_v2").create(newQuiz, {
        requestKey: null,
        mode: "no-cors",
        headers: { "Access-Control-Allow-Origin": "*" },
      });
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
      result = await client.collection<Quiz[]>("quiz_v2").getFullList({
        mode: "no-cors",
        headers: { "Access-Control-Allow-Origin": "*" },
      });
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
      result = await client.collection<Quiz>("quiz_v2").getOne(quizId, {
        requestKey: null,
        mode: "no-cors",
        headers: { "Access-Control-Allow-Origin": "*" },
      });
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
        .update(quizId, updatedPartQuiz, {
          mode: "no-cors",
          headers: { "Access-Control-Allow-Origin": "*" },
        });
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
