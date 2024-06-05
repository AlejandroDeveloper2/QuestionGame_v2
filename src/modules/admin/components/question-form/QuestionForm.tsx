/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from "react";

import {
  Clock,
  Coins,
  EditPencil,
  Emoji,
  EmojiQuite,
  EmojiTalkingAngry,
  Hexagon,
  Plus,
  QuestionMark,
  Text,
} from "iconoir-react";

import { initialQuestionErrors, initialQuestionValues } from "@admin/constants";
import {
  Answer,
  Category,
  Difficulty,
  QuestionFormData,
} from "@admin/types/data-types";
import { QuestionFormProps } from "@admin/types/component-types";

import {
  useForm,
  useListInputControl,
  useLoading,
  useMultiOptionInput,
} from "@core/hooks";
import { useCategoryStore, useQuestionStore } from "@admin/hooks";
import { validationSchema } from "./ValidationSchema";

import { Form } from "@core/components";
import AnswerForm from "../answer-form/AnswerForm";

const QuestionForm = ({ mode, closeModal }: QuestionFormProps): JSX.Element => {
  const { question, addQuestion, editQuestion } = useQuestionStore();
  const { categories, getAllCategories } = useCategoryStore();
  const { loading, toggleLoading } = useLoading();
  const { loading: loadingCategories, toggleLoading: toggleLoadingCategories } =
    useLoading();

  const {
    formRef,
    data,
    errors,
    subform,
    toggleSubform,
    updateInitialValues,
    updateFormData,
    handleChange,
    handleSubmit,
    clearForm,
  } = useForm<QuestionFormData>(
    initialQuestionValues,
    initialQuestionErrors,
    validationSchema,
    () => {
      if (question && mode === "edit") {
        editQuestion(question.id, data, toggleLoading).then(() => closeModal());
        return;
      }
      addQuestion(data, toggleLoading).then(() => closeModal());
      clearForm();
      clearOptionList();
    }
  );

  const { addOption, removeOption, updateOptionList, clearOptionList } =
    useListInputControl<QuestionFormData, Answer>(
      initialQuestionValues.answers,
      "answers",
      updateFormData
    );

  const { markOption } = useMultiOptionInput<QuestionFormData, Difficulty>(
    ["Basico", "Intermedio", "Experto"],
    "Basico",
    "difficulty",
    updateFormData
  );

  useEffect(() => {
    if (question && mode === "edit") {
      updateInitialValues({
        name: question.name,
        questionBody: question.questionBody,
        answers: question.answers,
        time: question.time,
        reward: question.reward,
        category: question.category,
        difficulty: question.difficulty,
      });
      updateOptionList(question.answers);
    }
  }, [question, mode]);

  if (subform)
    return <AnswerForm addOption={addOption} toggleForm={toggleSubform} />;
  return (
    <Form formRef={formRef} handleSubmit={handleSubmit}>
      <Form.FieldSet fieldSetStyle={{ width: { sm: 100, md: 100, lg: 1100 } }}>
        <Form.Input
          type="text"
          placeholder="Escribe el nombre de la pregunta"
          label="Nombre"
          name="name"
          value={data.name}
          Icon={QuestionMark}
          errorMessage={errors.name.message}
          onChange={handleChange}
        />
        <Form.Input
          type="text"
          placeholder="Escribe el enunciado"
          label="Enunciado"
          name="questionBody"
          value={data.questionBody}
          Icon={Text}
          errorMessage={errors.questionBody.message}
          onChange={handleChange}
        />
        <Form.ListInputControl<Answer>
          highlightedKey="isCorrectAnswer"
          displayedKey="answerText"
          label="Opciones de respuesta"
          name="answers"
          options={data.answers}
          errorMessage={errors.answers.message}
          toggleForm={toggleSubform}
          removeOption={removeOption}
        />
        <Form.Input
          type="number"
          placeholder="Escribe tiempo para responder"
          label="Tiempo para responder (segundos)"
          name="time"
          value={String(data.time)}
          errorMessage={errors.time.message}
          Icon={Clock}
          onChange={handleChange}
        />
        <Form.Input
          type="number"
          placeholder="Escribe la recompensa"
          label="Recompensa"
          name="reward"
          value={String(data.reward)}
          errorMessage={errors.reward.message}
          Icon={Coins}
          onChange={handleChange}
        />
        <Form.Select<Category>
          label="Categoría"
          name="category"
          inputKey="name"
          value={data.category}
          Icon={Hexagon}
          options={categories}
          errorMessage={errors.category.message}
          loading={loadingCategories}
          onChange={handleChange}
          onLoadData={() =>
            categories.length === 0
              ? getAllCategories(toggleLoadingCategories)
              : categories
          }
        />
        <Form.MultiOptionInput<Difficulty>
          label="Dificultad"
          name="difficulty"
          options={["Basico", "Intermedio", "Experto"]}
          icons={[Emoji, EmojiQuite, EmojiTalkingAngry]}
          selectedOption={data.difficulty}
          errorMessage={errors.difficulty.message}
          markOption={markOption}
        />
      </Form.FieldSet>
      <Form.Button
        label={mode === "add" ? "Agregar pregunta" : "Editar pregunta"}
        title={
          mode === "add" ? "Agregar pregunta al banco!" : "Guardar cambios!"
        }
        onClick={() => {}}
        loading={loading}
        variant={mode === "add" ? "primary" : "warning"}
        Icon={mode === "add" ? Plus : EditPencil}
        type="submit"
      />
    </Form>
  );
};

export default QuestionForm;
