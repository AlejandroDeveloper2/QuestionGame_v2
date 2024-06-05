/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from "react";
import { EditPencil, Hexagon, Plus } from "iconoir-react";

import { initialCategoryErrors, initialCategoryValues } from "@admin/constants";
import { CategoryFormData } from "@admin/types/data-types";
import { CategoryFormProps } from "@admin/types/component-types";

import { useForm, useLoading } from "@core/hooks";
import { useCategoryStore } from "@admin/hooks";
import { validationSchema } from "./ValidationSchema";

import { Form } from "@core/components";

const CategoryForm = ({ mode, closeModal }: CategoryFormProps): JSX.Element => {
  const { category, addCategory, editCategory } = useCategoryStore();
  const { loading, toggleLoading } = useLoading();

  const {
    formRef,
    data,
    errors,
    updateInitialValues,
    handleChange,
    handleSubmit,
    clearForm,
  } = useForm<CategoryFormData>(
    initialCategoryValues,
    initialCategoryErrors,
    validationSchema,
    () => {
      if (category && mode === "edit") {
        editCategory(category.id, data, toggleLoading).then(() => closeModal());
        return;
      }
      addCategory(data, toggleLoading).then(() => closeModal());
      clearForm();
    }
  );

  useEffect(() => {
    if (category && mode === "edit") updateInitialValues(category);
    else updateInitialValues(initialCategoryValues);
  }, [category, mode]);

  return (
    <Form formRef={formRef} handleSubmit={handleSubmit}>
      <Form.FieldSet fieldSetStyle={{ width: { sm: 100, md: 100, lg: 380 } }}>
        <Form.Input
          type="text"
          placeholder="Escribe la categoria"
          label="Nombre categoria"
          name="name"
          value={data.name}
          Icon={Hexagon}
          errorMessage={errors.name.message}
          onChange={handleChange}
        />
      </Form.FieldSet>
      <Form.Button
        label={mode === "add" ? "Agregar categoria" : "Editar categoria"}
        title={mode === "add" ? "Agregar nueva categoria" : "Guardar cambios"}
        onClick={() => {}}
        loading={loading}
        variant={mode === "add" ? "primary" : "warning"}
        Icon={mode === "add" ? Plus : EditPencil}
        type="submit"
      />
    </Form>
  );
};

export default CategoryForm;
