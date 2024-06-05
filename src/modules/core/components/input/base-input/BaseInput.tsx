import { BaseInputProps } from "@core/types/component-types";

import { ErrorMessage } from "@core/components";

import { InputBody, InputContainer } from "./BaseInput.style";

const BaseInput = ({
  label,
  name,
  Icon,
  errorMessage,
  children,
}: BaseInputProps): JSX.Element => {
  return (
    <InputContainer id="input-container">
      <label htmlFor={name}>{label}</label>
      <InputBody id={name}>
        <Icon id="input-icon" />
        {children}
      </InputBody>
      {errorMessage ? <ErrorMessage message={errorMessage} /> : null}
    </InputContainer>
  );
};

export default BaseInput;
