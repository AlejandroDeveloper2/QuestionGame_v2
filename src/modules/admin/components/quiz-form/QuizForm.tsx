import { useNavigate } from "react-router-dom";
import {
  EditPencil,
  Emoji,
  EmojiQuite,
  EmojiSurprise,
  Hexagon,
  Plus,
  QuestionMark,
} from "iconoir-react";

import { QuizFormProps } from "@admin/types/component-types";
import { Category, QuizFormData } from "@admin/types/data-types";

import { initialQuizErrors, initialQuizValues } from "@admin/constants";

import { useForm, useLoading, useMultiselect } from "@core/hooks";
import { useCategoryStore, useQuizAdminStore } from "@admin/hooks";
import { validationSchema } from "./ValidationSchema";

import { Form } from "@core/components";

const QuizForm = ({ mode, closeModal }: QuizFormProps): JSX.Element => {
  const navigate = useNavigate();

  const { createQuiz } = useQuizAdminStore();
  const { categories, getAllCategories } = useCategoryStore();
  const { loading, toggleLoading } = useLoading();
  const { loading: loadingCategories, toggleLoading: toggleLoadingCategories } =
    useLoading();

  const {
    formRef,
    data,
    errors,
    //updateInitialValues,
    updateFormData,
    handleChange,
    handleSubmit,
    clearForm,
  } = useForm<QuizFormData>(
    initialQuizValues,
    initialQuizErrors,
    validationSchema,
    () => {
      createQuiz(data, toggleLoading).then(() => {
        closeModal();
        navigate("/admin/quiz");
      });
      clearForm();
      clearOptionList();
    }
  );

  const { addOption, removeOption, clearOptionList } = useMultiselect<
    QuizFormData,
    Category
  >(initialQuizValues.categories, "categories", updateFormData);

  return (
    <Form formRef={formRef} handleSubmit={handleSubmit}>
      <Form.FieldSet fieldSetStyle={{ width: { sm: 100, md: 100, lg: 1100 } }}>
        <Form.Input
          type="text"
          placeholder="Escribe el nombre del quiz"
          label="Nombre"
          name="name"
          value={data.name}
          Icon={QuestionMark}
          errorMessage={errors.name.message}
          onChange={handleChange}
        />
        <Form.MultiSelect<Category>
          Icon={Hexagon}
          values={data.categories}
          inputKey="name"
          label="Categorias del quiz"
          name="categories"
          options={categories}
          errorMessage={errors.categories.message}
          loading={loadingCategories}
          removeOption={removeOption}
          addOption={addOption}
          onLoadData={() => getAllCategories(toggleLoadingCategories)}
        />
        <Form.Input
          type="number"
          placeholder="Escribe el número de preguntas"
          label="Número de preguntas Nivel Básico"
          name="easyQuestions"
          value={String(data.easyQuestions)}
          errorMessage={errors.easyQuestions.message}
          Icon={Emoji}
          onChange={handleChange}
        />
        <Form.Input
          type="number"
          placeholder="Escribe el número de preguntas"
          label="Número de preguntas Nivel intermedio"
          name="mediumQuestions"
          value={String(data.mediumQuestions)}
          errorMessage={errors.mediumQuestions.message}
          Icon={EmojiQuite}
          onChange={handleChange}
        />
        <Form.Input
          type="number"
          placeholder="Escribe el número de preguntas"
          label="Número de preguntas Nivel Experto"
          name="expertQuestions"
          value={String(data.expertQuestions)}
          errorMessage={errors.expertQuestions.message}
          Icon={EmojiSurprise}
          onChange={handleChange}
        />
      </Form.FieldSet>
      <Form.Button
        label={mode === "add" ? "Crear quiz" : "Editar quiz"}
        title={mode === "add" ? "Agregar quiz!" : "Guardar cambios!"}
        onClick={() => {}}
        loading={loading}
        variant={mode === "add" ? "primary" : "warning"}
        Icon={mode === "add" ? Plus : EditPencil}
        type="submit"
      />
    </Form>
  );
};

export default QuizForm;
