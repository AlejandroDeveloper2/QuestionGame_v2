import { Check, Plus, Text, Xmark, XmarkCircle } from "iconoir-react";

import { initialAnswerErrors, initialAnswerValues } from "@admin/constants";
import { Answer } from "@admin/types/data-types";
import { AnswerFormProps } from "@admin/types/component-types";

import { validationSchema } from "./ValidationSchema";
import { useForm, useMultiOptionInput } from "@core/hooks";

import { Form } from "@core/components";

const AnswerForm = ({
  addOption,
  toggleForm,
}: AnswerFormProps): JSX.Element => {
  const {
    formRef,
    data,
    errors,
    updateFormData,
    handleChange,
    handleSubmit,
    clearForm,
  } = useForm<Answer>(
    initialAnswerValues,
    initialAnswerErrors,
    validationSchema,
    () => {
      addOption(data);
      clearForm();
      toggleForm();
    }
  );
  const { markOption } = useMultiOptionInput<Answer, boolean>(
    [true, false],
    false,
    "isCorrectAnswer",
    updateFormData
  );
  return (
    <Form formRef={formRef} handleSubmit={handleSubmit}>
      <Form.FieldSet fieldSetStyle={{ width: { sm: 100, md: 100, lg: 380 } }}>
        <Form.Input
          type="text"
          placeholder="Escribe la respuesta"
          label="Respuesta"
          name="answerText"
          value={data.answerText}
          Icon={Text}
          errorMessage={errors.answerText.message}
          onChange={handleChange}
        />
        <Form.MultiOptionInput<boolean>
          label="¿Respuesta Correcta?"
          name="isCorrectAnswer"
          options={[true, false]}
          icons={[Check, Xmark]}
          selectedOption={data.isCorrectAnswer}
          errorMessage={errors.isCorrectAnswer.message}
          markOption={markOption}
        />
      </Form.FieldSet>
      <Form.Button
        label="Agregar"
        title="Agregar opción respuesta!"
        onClick={() => {}}
        variant="primary"
        Icon={Plus}
        type="submit"
      />
      <Form.Button
        label="Cancelar"
        title="Volver a la pregunta!"
        onClick={toggleForm}
        variant="neutral"
        Icon={XmarkCircle}
        type="button"
      />
    </Form>
  );
};

export default AnswerForm;
