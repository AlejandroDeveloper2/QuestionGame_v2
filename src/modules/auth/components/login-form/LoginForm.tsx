import { Lock, LogIn, User } from "iconoir-react";

import { initialLoginErrors, initialLoginValues } from "@auth/constants";
import { LoginFormData } from "@auth/types/data-types";

import { useForm, useLoading } from "@core/hooks";
import { useAuthStore } from "@auth/hooks";
import { validationSchema } from "./ValidationSchema";

import { Form } from "@core/components";

import { FormContainer } from "@core/styles/GlobalStyles.style";

const LoginForm = (): JSX.Element => {
  const { login } = useAuthStore();
  const { loading, toggleLoading } = useLoading();

  const { formRef, data, errors, handleChange, handleSubmit } =
    useForm<LoginFormData>(
      initialLoginValues,
      initialLoginErrors,
      validationSchema,
      () => {
        login(data, toggleLoading);
      }
    );

  return (
    <FormContainer>
      <h1>Iniciar Sesión Admin</h1>
      <Form formRef={formRef} handleSubmit={handleSubmit}>
        <Form.FieldSet fieldSetStyle={{ width: { sm: 100, md: 100, lg: 400 } }}>
          <Form.Input
            type="text"
            placeholder="Escribe tu nombre de usuario"
            label="Nombre de usuario"
            name="username"
            value={data.username}
            errorMessage={errors.username.message}
            Icon={User}
            onChange={handleChange}
          />
          <Form.Input
            type="password"
            placeholder="Escribe tu contraseña"
            label="Contraseña"
            name="password"
            value={data.password}
            errorMessage={errors.password.message}
            Icon={Lock}
            onChange={handleChange}
          />
        </Form.FieldSet>
        <Form.Button
          type="submit"
          label="Iniciar sesión"
          title="Ingresar al panel de admin!"
          onClick={() => {}}
          loading={loading}
          variant="secondary"
          Icon={LogIn}
        />
      </Form>
    </FormContainer>
  );
};

export default LoginForm;
