import { useState, useRef } from "react";

import { FieldErrorType, WrongInput } from "@core/types/data-types";

const useForm = <T>(
  initialValues: T,
  initialErrors: WrongInput<keyof T>,
  validationSchema: (
    formData: T,
    formRef: React.RefObject<HTMLFormElement>
  ) => Promise<WrongInput<keyof T>>,
  action: () => void
) => {
  const [data, setData] = useState<T>(initialValues);
  const [errors, setErrors] = useState<WrongInput<keyof T>>(initialErrors);
  const formRef = useRef<HTMLFormElement>(null);
  const updateErrors = (updatedErrors: WrongInput<keyof T>): void => {
    setErrors(updatedErrors);
  };

  const [subform, setSubform] = useState<boolean>(false);

  const toggleSubform = (): void => {
    setSubform(!subform);
  };

  const updateInitialValues = (updatedInitialValues: T): void => {
    setData(updatedInitialValues);
  };

  const updateFormData = <T>(fieldValue: unknown, key: keyof T): void => {
    setData({ ...data, [key]: fieldValue });
  };

  const clearForm = (): void => {
    setData(initialValues);
    setErrors(initialErrors);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ): Promise<void> => {
    e.preventDefault();
    const wrongInput = await validationSchema(data, formRef);
    updateErrors(wrongInput);

    if (
      Object.values<FieldErrorType>(wrongInput).every((error) => !error.error)
    ) {
      action();
      return;
    }
  };

  return {
    formRef,
    errors,
    data,
    subform,
    toggleSubform,
    updateInitialValues,
    updateFormData,
    handleChange,
    handleSubmit,
    clearForm,
  };
};

export default useForm;
