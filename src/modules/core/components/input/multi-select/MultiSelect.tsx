/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { Xmark } from "iconoir-react";

import { MultiSelectProps } from "@core/types/component-types";

import { BaseInput, Spinner } from "@core/components";

import {
  Arrow,
  DropdownMenu,
  Label,
  MultiSelectList,
  SelectedOption,
} from "./MultiSelect.style";

function MultiSelect<T>({
  options,
  values,
  inputKey,
  loading,
  disabled,
  addOption,
  removeOption,
  onLoadData,
  ...props
}: MultiSelectProps<T>): JSX.Element {
  const [isDropdownVisible, setIsDropdownVisible] = useState<boolean>(false);

  useEffect(() => {
    onLoadData();
  }, []);

  return (
    <BaseInput {...props}>
      <Label
        id="drop"
        onClick={() => {
          setIsDropdownVisible(!isDropdownVisible);
        }}
      ></Label>
      <MultiSelectList>
        {values.map((value, i) => (
          <li key={i}>
            <SelectedOption>
              <Xmark onClick={() => removeOption(i)} />
              <span>{value[inputKey] as string}</span>
            </SelectedOption>
          </li>
        ))}
      </MultiSelectList>
      <DropdownMenu
        isdropdownvisible={String(isDropdownVisible)}
        numrows={options.length}
        selectedoptions={values.length}
      >
        {loading && loading.isLoading ? (
          <Spinner
            color="var(--primary-color-base)"
            direction="column"
            message={loading.message}
          />
        ) : (
          options.map((option, i) => (
            <button
              type="reset"
              key={i}
              onClick={() => addOption(option)}
              disabled={disabled}
            >
              <span> {option[inputKey] as string}</span>
            </button>
          ))
        )}
      </DropdownMenu>
      <Arrow id="select-arrow" />
    </BaseInput>
  );
}

export default MultiSelect;
