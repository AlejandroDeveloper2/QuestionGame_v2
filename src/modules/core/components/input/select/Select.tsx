import { NavArrowDown } from "iconoir-react";

import { SelectProps } from "@core/types/component-types";

import { BaseInput, Spinner } from "@core/components";

import { SelectElement } from "./Select.style";

function Select<T>({
  label,
  Icon,
  errorMessage,
  options,
  inputKey,
  loading,
  onLoadData,
  ...props
}: SelectProps<T>): JSX.Element {
  return (
    <BaseInput
      label={label}
      Icon={Icon}
      name={props.name}
      errorMessage={errorMessage}
    >
      {loading && loading.isLoading ? (
        <Spinner
          message={loading.message}
          direction="row"
          color="var(--primary-color-base)"
        />
      ) : (
        <SelectElement
          {...props}
          name={props.name}
          onClick={onLoadData}
          autoComplete="off"
        >
          <option value="" defaultValue={props.value}>
            --Selecione una opción--
          </option>

          {options.map((option, i) => (
            <option key={i} value={option[inputKey] as string}>
              {String(option[inputKey])}
            </option>
          ))}
        </SelectElement>
      )}
      <NavArrowDown id="select-arrow" />
    </BaseInput>
  );
}

export default Select;
