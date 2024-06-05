import { DollarCircle, Gift } from "iconoir-react";

import { initialAwardErrors, initialAwardValues } from "@admin/constants";

import { ConsolationAwardFormData } from "@admin/types/data-types";
import { ConsolationAwardFormProps } from "@admin/types/component-types";

import { useForm, useLoading } from "@core/hooks";
import { useQuizAdminStore } from "@admin/hooks";
import { validationSchema } from "./ValidationSchema";

import { Form } from "@core/components";

const ConsolationAwardForm = ({
  closeModal,
}: ConsolationAwardFormProps): JSX.Element => {
  const { loading, toggleLoading } = useLoading();

  const { quiz, setConsolationAward } = useQuizAdminStore();

  const { formRef, data, errors, handleChange, handleSubmit, clearForm } =
    useForm<ConsolationAwardFormData>(
      initialAwardValues,
      initialAwardErrors,
      validationSchema,
      () => {
        if (quiz)
          setConsolationAward(
            quiz.id,
            data.consolationAward,
            toggleLoading
          ).then(() => {
            closeModal();
            clearForm();
          });
      }
    );

  return (
    <Form formRef={formRef} handleSubmit={handleSubmit}>
      <Form.FieldSet fieldSetStyle={{ width: { sm: 100, md: 100, lg: 380 } }}>
        <Form.Input
          type="number"
          placeholder="Digita el valor del premio"
          label="Premio de compensación"
          name="consolationAward"
          value={data.consolationAward}
          Icon={Gift}
          errorMessage={errors.consolationAward.message}
          onChange={handleChange}
        />
      </Form.FieldSet>
      <Form.Button
        label="Conceder premio"
        title="Conceder premio de compensación"
        onClick={() => {}}
        loading={loading}
        variant="primary"
        Icon={DollarCircle}
        type="submit"
      />
    </Form>
  );
};

export default ConsolationAwardForm;
