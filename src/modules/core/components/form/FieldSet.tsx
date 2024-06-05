import { FieldSetProps } from "@core/types/component-types";

import { FieldSetContainer } from "./Form.style";

const FieldSet = ({ children, fieldSetStyle }: FieldSetProps): JSX.Element => {
  return (
    <FieldSetContainer width={fieldSetStyle.width}>
      {children}
    </FieldSetContainer>
  );
};

export default FieldSet;
