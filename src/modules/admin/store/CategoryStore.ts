import { create } from "zustand";
import { toast } from "react-toastify";

import { CategoryStore } from "@admin/types/store-types";
import { Loading, ServerResponse } from "@core/types/data-types";
import { Category, CategoryFormData } from "@admin/types/data-types";

import { CategoryService } from "@admin/services";
import { ListResult } from "pocketbase";

const categoryService = new CategoryService();

const categoryStore = create<CategoryStore>((set, get) => ({
  categories: [],
  category: null,
  pagination: {
    page: 0,
    perPage: 0,
    totalItems: 0,
    totalPages: 0,
  },
  getAllCategories: async (
    toggleLoading: (loadingStatus: Loading) => void
  ): Promise<void> => {
    toggleLoading({
      isLoading: true,
      message: "Cargando categorias...",
    });
    try {
      const categories: Category[] = await categoryService.getAllCategories();
      set({ categories });
    } catch (_e: unknown) {
      const parsedError = _e as ServerResponse;
      toast.error(parsedError.message);
    } finally {
      toggleLoading({
        isLoading: false,
        message: "",
      });
    }
  },
  getCategories: async (
    toggleLoading: (loadingStatus: Loading) => void,
    page,
    limit
  ): Promise<void> => {
    toggleLoading({
      isLoading: true,
      message: "Cargando categorias...",
    });
    try {
      const {
        items,
        page: currentPage,
        perPage,
        totalItems,
        totalPages,
      }: ListResult<Category> = await categoryService.getCategories(
        page,
        limit
      );
      set({
        categories: items,
        pagination: {
          page: currentPage,
          perPage,
          totalItems,
          totalPages,
        },
      });
    } catch (_e: unknown) {
      const parsedError = _e as ServerResponse;
      toast.error(parsedError.message);
    } finally {
      toggleLoading({
        isLoading: false,
        message: "",
      });
    }
  },
  getCategory: async (categoryId: string): Promise<void> => {
    try {
      const category: Category = await categoryService.getCategory(categoryId);
      set({ category });
    } catch (_e: unknown) {
      const parsedError = _e as ServerResponse;
      toast.error(parsedError.message);
    }
  },
  addCategory: async (
    category: CategoryFormData,
    toggleLoading: (loadingStatus: Loading) => void
  ): Promise<void> => {
    toggleLoading({
      isLoading: true,
      message: "Agregando categoria...",
    });
    try {
      const newCategory: Category = await categoryService.addCategory(category);
      set(({ categories }) => ({ categories: [...categories, newCategory] }));
      await get().getCategories(toggleLoading, get().pagination.page, 12);
      toast.success("Categoria añadida correctamente!");
    } catch (_e: unknown) {
      const parsedError = _e as ServerResponse;
      toast.error(parsedError.message);
    } finally {
      toggleLoading({
        isLoading: false,
        message: "",
      });
    }
  },
  editCategory: async (
    categoryId: string,
    updatedCategory: CategoryFormData,
    toggleLoading: (loadingStatus: Loading) => void
  ): Promise<void> => {
    toggleLoading({
      isLoading: true,
      message: "Actualizando categoria...",
    });
    try {
      const modifiedCategory: Category = await categoryService.editCategory(
        categoryId,
        updatedCategory
      );
      set(({ categories }) => ({
        categories: categories.map((category) => {
          if (category.id === categoryId) return modifiedCategory;
          return category;
        }),
      }));
      toast.success("¡Categoria actualizada correctamente!");
    } catch (_e: unknown) {
      const parsedError = _e as ServerResponse;
      toast.error(parsedError.message);
    } finally {
      toggleLoading({
        isLoading: false,
        message: "",
      });
    }
  },
  removeCategory: async (
    categoryId: string,
    toggleLoading: (loadingStatus: Loading) => void
  ): Promise<void> => {
    toggleLoading({
      isLoading: true,
      message: "Eliminando categoria...",
    });
    try {
      await categoryService.removeCategory(categoryId);
      set(({ categories }) => ({
        categories: categories.filter((category) => category.id !== categoryId),
      }));
      await get().getCategories(toggleLoading, get().pagination.page, 12);
      toast.success("¡Categoria eliminada correctamente!");
    } catch (_e: unknown) {
      const parsedError = _e as ServerResponse;
      toast.error(parsedError.message);
    } finally {
      toggleLoading({
        isLoading: false,
        message: "",
      });
    }
  },
}));

export default categoryStore;
