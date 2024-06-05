import { FieldErrorType } from "@core/types/data-types";

const markWrongInput = <T>(
  formRef: React.RefObject<HTMLFormElement>,
  inputKey: keyof T,
  error: boolean
): void => {
  const $fieldset = formRef.current?.querySelector("fieldset");
  const $input = $fieldset?.querySelector(`#${inputKey as string}`);
  if (error) $input?.setAttribute("style", "border-color: var(--red)");
  else $input?.setAttribute("style", "border-color: var(--primary-color-base)");
};

export class Validations {
  constructor() {}

  public validateEmptyFields<T>(
    field: string | number,
    key: keyof T,
    formRef: React.RefObject<HTMLFormElement>
  ): Promise<FieldErrorType> {
    let error: FieldErrorType;
    if (field === "") {
      error = {
        message: "El campo es obligatorio!",
        error: true,
      };
      markWrongInput<T>(formRef, key, true);
      return Promise.reject(error);
    } else {
      error = {
        message: "",
        error: false,
      };
      markWrongInput<T>(formRef, key, false);
      return Promise.resolve(error);
    }
  }

  public validateNumericFields<T>(
    field: number,
    key: keyof T,
    formRef: React.RefObject<HTMLFormElement>
  ): Promise<FieldErrorType> {
    let error: FieldErrorType;
    const isNumberExp = /^[0-9]+$/;

    if (field < 0) {
      error = {
        message: "El número ingresado no puede ser negativo!",
        error: true,
      };
      markWrongInput<T>(formRef, key, true);
      return Promise.reject(error);
    } else if (!isNumberExp.test(String(field))) {
      error = {
        message: "El valor ingresado debe ser un número!",
        error: true,
      };
      markWrongInput<T>(formRef, key, true);
      return Promise.reject(error);
    } else {
      error = {
        message: "",
        error: false,
      };
      markWrongInput<T>(formRef, key, false);
      return Promise.resolve(error);
    }
  }

  public validateUsername<T>(
    field: string,
    key: keyof T,
    formRef: React.RefObject<HTMLFormElement>
  ): Promise<FieldErrorType> {
    let error: FieldErrorType;
    if (field.length < 3) {
      error = {
        message: "El nombre de usuario debe tener de al menos 3 caracteres!",
        error: true,
      };
      markWrongInput<T>(formRef, key, true);
      return Promise.reject(error);
    } else {
      error = {
        message: "",
        error: false,
      };
      markWrongInput<T>(formRef, key, false);
      return Promise.resolve(error);
    }
  }

  public validateOptionsLength<T, A>(
    options: A[],
    key: keyof T,
    formRef: React.RefObject<HTMLFormElement>
  ): Promise<FieldErrorType> {
    let error: FieldErrorType;
    if (options.length === 0 || options.length < 4) {
      error = {
        message: "Añade solo 4 opciones!",
        error: true,
      };
      markWrongInput<T>(formRef, key, true);
      return Promise.reject(error);
    } else {
      error = {
        message: "",
        error: false,
      };
      markWrongInput<T>(formRef, key, false);
      return Promise.resolve(error);
    }
  }

  public validateOptions<T, C>(
    elements: T[],
    key: keyof T,
    limit: number,
    comparedValue: C,
    errorMessage: string,
    formRef: React.RefObject<HTMLFormElement>
  ): Promise<FieldErrorType> {
    let error: FieldErrorType;
    const unhighlightedElements = elements.filter(
      (element) => element[key] === comparedValue
    );
    if (unhighlightedElements.length === limit) {
      error = {
        message: "",
        error: false,
      };
      markWrongInput<T>(formRef, key, false);
      return Promise.resolve(error);
    } else {
      error = {
        message: errorMessage,
        error: true,
      };
      markWrongInput<T>(formRef, key, true);
      return Promise.reject(error);
    }
  }
}
