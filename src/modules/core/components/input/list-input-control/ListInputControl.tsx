import { Plus } from "iconoir-react";

import { ListInputControlProps } from "@core/types/component-types";

import { ErrorMessage, IconOnlyButton } from "@core/components";
import Elements from "./Elements";

import { ListInputBody, ListInputContainer } from "./ListInputControl.style";

function ListInputControl<T>({
  label,
  name,
  errorMessage,
  toggleForm,
  ...props
}: ListInputControlProps<T>): JSX.Element {
  return (
    <ListInputContainer id={name}>
      <label>{label}</label>
      <ListInputBody>
        <Elements {...props} />
        <IconOnlyButton
          Icon={Plus}
          type="button"
          variant="primary"
          title="Agregar más ópciones"
          onClick={toggleForm}
        />
      </ListInputBody>
      {errorMessage ? <ErrorMessage message={errorMessage} /> : null}
    </ListInputContainer>
  );
}

export default ListInputControl;
