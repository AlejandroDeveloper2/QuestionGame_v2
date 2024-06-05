import { Question, QuestionFormData } from "@admin/types/data-types";
import { ServerResponse } from "@core/types/data-types";

import { client } from "@config/pocketbase";

class QuestionService {
  constructor() {}

  public async getAllQuestions(): Promise<Question[]> {
    let result: Question[];
    try {
      result = await client
        .collection<Question[]>("questions")
        .getFullList({ requestKey: null });
    } catch (e: unknown) {
      const parsedError = e as ServerResponse;
      throw new Error(
        (parsedError.message =
          "¡Ha ocurrido un error al obtener el banco de preguntas!")
      );
    }
    return result;
  }

  public async getQuestion(questionId: string): Promise<Question> {
    let result: Question;
    try {
      result = await client
        .collection<Question>("questions")
        .getOne(questionId, { requestKey: null });
    } catch (e: unknown) {
      const parsedError = e as ServerResponse;
      throw new Error(
        (parsedError.message = "¡Ha ocurrido un error al obtener la pregunta!")
      );
    }
    return result;
  }

  public async addQuestion(newQuestion: QuestionFormData): Promise<Question> {
    let result: Question;
    try {
      result = await client
        .collection<Question>("questions")
        .create(newQuestion, { requestKey: null });
    } catch (e: unknown) {
      const parsedError = e as ServerResponse;
      throw new Error(
        (parsedError.message = "¡Ha ocurrido un error al crear la pregunta!")
      );
    }
    return result;
  }
  public async editQuestion(
    questionId: string,
    updatedQuestion: QuestionFormData
  ): Promise<Question> {
    let result: Question;
    try {
      result = await client
        .collection<Question>("questions")
        .update(questionId, updatedQuestion, { requestKey: null });
    } catch (e: unknown) {
      const parsedError = e as ServerResponse;
      throw new Error(
        (parsedError.message =
          "¡Ha ocurrido un error al actualizar la pregunta!")
      );
    }
    return result;
  }
  public async removeQuestion(questionId: string): Promise<void> {
    try {
      await client
        .collection("questions")
        .delete(questionId, { requestKey: null });
    } catch (e: unknown) {
      const parsedError = e as ServerResponse;
      throw new Error(
        (parsedError.message = "¡Ha ocurrido un error al eliminar la pregunta!")
      );
    }
  }
}

export default QuestionService;
