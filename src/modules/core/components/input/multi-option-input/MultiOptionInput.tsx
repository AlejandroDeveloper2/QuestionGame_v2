import { MultiOptionInputProps } from "@core/types/component-types";

import { ErrorMessage } from "@core/components";
import Options from "./Options";

import { MultiOptionInputContainer } from "./MultiOptionInput.style";

function MultiOptionInput<T>({
  label,
  name,
  errorMessage,
  ...props
}: MultiOptionInputProps<T>): JSX.Element {
  return (
    <MultiOptionInputContainer id={name}>
      <label>{label}</label>
      <Options<T> {...props} />
      {errorMessage ? <ErrorMessage message={errorMessage} /> : null}
    </MultiOptionInputContainer>
  );
}

export default MultiOptionInput;
