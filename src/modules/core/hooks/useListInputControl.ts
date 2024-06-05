/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from "react";

const useListInputControl = <T, S>(
  options: S[],
  key: keyof T,
  updateFormData: <T>(fieldValue: S | S[], key: keyof T) => void
) => {
  const [optionList, setOptionList] = useState<S[]>(options);

  useEffect(() => {
    updateFormData<T>(optionList, key);
  }, [optionList]);

  const addOption = (option: S): void => {
    setOptionList([...optionList, option]);
  };

  const removeOption = (id: number): void => {
    const filteredOptions = optionList.filter((_, i) => i !== id);
    setOptionList(filteredOptions);
  };

  const updateOptionList = (updatedOptions: S[]) => {
    setOptionList(updatedOptions);
  };

  const clearOptionList = (): void => {
    setOptionList([]);
  };

  return {
    optionList,
    addOption,
    removeOption,
    updateOptionList,
    clearOptionList,
  };
};
export default useListInputControl;
