import { useNavigate } from "react-router-dom";
import { Code, Play, User } from "iconoir-react";

import { StartFormData } from "@auth/types/data-types";
import { initialStartValues, initialStartErrors } from "@auth/constants";

import { useForm, useLoading } from "@core/hooks";
import { useAuthStore } from "@auth/hooks";
import { validationSchema } from "./ValidationSchema";
import { pasteTextFromClipboard } from "@core/helpers";

import { Form } from "@core/components";

import { FormContainer } from "@core/styles/GlobalStyles.style";

const StartForm = (): JSX.Element => {
  const navigate = useNavigate();
  const { authenticatePlayer } = useAuthStore();
  const { loading, toggleLoading } = useLoading();

  const {
    formRef,
    data,
    errors,
    handleChange,
    handleSubmit,
    updateInitialValues,
  } = useForm<StartFormData>(
    initialStartValues,
    initialStartErrors,
    validationSchema,
    () => {
      authenticatePlayer(data, toggleLoading).then(() => {
        navigate(`/game/${data.quizCode}`);
      });
    }
  );

  return (
    <FormContainer>
      <h1>¡Bienvenido!</h1>
      <Form formRef={formRef} handleSubmit={handleSubmit}>
        <Form.FieldSet fieldSetStyle={{ width: { sm: 100, md: 100, lg: 500 } }}>
          <Form.Input
            type="text"
            placeholder="Escribe el nombre del juagdor"
            label="Nombre del jugador"
            name="username"
            value={data.username}
            errorMessage={errors.username.message}
            Icon={User}
            onChange={handleChange}
          />
          <Form.Input
            type="text"
            placeholder="Escribe el código del quiz"
            label="Codigo quiz"
            name="quizCode"
            value={data.quizCode}
            errorMessage={errors.quizCode.message}
            Icon={Code}
            onPasteText={() =>
              pasteTextFromClipboard("¡Código pegado!").then((quizCode) =>
                updateInitialValues({ ...data, quizCode })
              )
            }
            onChange={handleChange}
          />
        </Form.FieldSet>
        <Form.Button
          type="submit"
          label="Iniciar Quiz"
          title="Empezar Quiz!"
          onClick={() => {}}
          variant="secondary"
          Icon={Play}
          loading={loading}
        />
      </Form>
    </FormContainer>
  );
};

export default StartForm;
