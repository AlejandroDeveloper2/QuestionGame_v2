import { PasteClipboard } from "iconoir-react";

import { InputTextProps } from "@core/types/component-types";

import { BaseInput } from "../..";

import { InputElement } from "./InputText.style";

const InputText = ({
  label,
  Icon,
  name,
  errorMessage,
  onPasteText,
  ...props
}: InputTextProps): JSX.Element => {
  return (
    <BaseInput
      label={label}
      Icon={Icon}
      name={name}
      errorMessage={errorMessage}
    >
      <InputElement {...props} name={name} autoComplete="off" />
      {onPasteText ? (
        <PasteClipboard id="paste-text-button" onClick={onPasteText} />
      ) : null}
    </BaseInput>
  );
};

export default InputText;
