import { FormProps } from "@core/types/component-types";

import FieldSet from "./FieldSet";
import {
  InputText,
  Select,
  ButtonWithIcon,
  ListInputControl,
  MultiOptionInput,
  MultiSelect,
} from "@core/components";

import { FormBody } from "./Form.style";

const Form = ({ children, formRef, handleSubmit }: FormProps): JSX.Element => {
  return (
    <FormBody ref={formRef} onSubmit={handleSubmit}>
      {children}
    </FormBody>
  );
};

Form.FieldSet = FieldSet;
Form.Input = InputText;
Form.Select = Select;
Form.Button = ButtonWithIcon;
Form.ListInputControl = ListInputControl;
Form.MultiOptionInput = MultiOptionInput;
Form.MultiSelect = MultiSelect;

export default Form;
