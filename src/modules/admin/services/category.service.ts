import { Category, CategoryFormData } from "@admin/types/data-types";
import { ServerResponse } from "@core/types/data-types";

import { client } from "@config/pocketbase";

class CategoryService {
  constructor() {}
  public async getAllCategories(): Promise<Category[]> {
    let result: Category[];
    try {
      result = await client
        .collection<Category[]>("categories")
        .getFullList({ requestKey: null });
    } catch (e: unknown) {
      const parsedError = e as ServerResponse;
      throw new Error(
        (parsedError.message =
          "¡Ha ocurrido un error al obtener las categorias!")
      );
    }
    return result;
  }

  public async getCategory(categoryId: string): Promise<Category> {
    let result: Category;
    try {
      result = await client
        .collection<Category>("categories")
        .getOne(categoryId, { requestKey: null });
    } catch (e: unknown) {
      const parsedError = e as ServerResponse;
      throw new Error(
        (parsedError.message = "¡Ha ocurrido un error al obtener la categoria!")
      );
    }
    return result;
  }

  public async addCategory(newCategory: CategoryFormData): Promise<Category> {
    let result: Category;
    try {
      result = await client
        .collection<Category>("categories")
        .create(newCategory, { requestKey: null });
    } catch (e: unknown) {
      const parsedError = e as ServerResponse;
      throw new Error(
        (parsedError.message = "¡Ha ocurrido un error al crear la categoria!")
      );
    }
    return result;
  }
  public async editCategory(
    categoryId: string,
    updatedCategory: CategoryFormData
  ): Promise<Category> {
    let result: Category;
    try {
      result = await client
        .collection<Category>("categories")
        .update(categoryId, updatedCategory, { requestKey: null });
    } catch (e: unknown) {
      const parsedError = e as ServerResponse;
      throw new Error(
        (parsedError.message =
          "¡Ha ocurrido un error al actualizar la categoria!")
      );
    }
    return result;
  }
  public async removeCategory(categoryId: string): Promise<void> {
    try {
      await client
        .collection("categories")
        .delete(categoryId, { requestKey: null });
    } catch (e: unknown) {
      const parsedError = e as ServerResponse;
      throw new Error(
        (parsedError.message =
          "¡Ha ocurrido un error al eliminar la categoria!")
      );
    }
  }
}

export default CategoryService;
