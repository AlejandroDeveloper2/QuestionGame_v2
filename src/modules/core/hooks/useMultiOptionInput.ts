/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from "react";

const useMultiOptionInput = <T, S>(
  options: S[],
  defaultOption: S,
  key: keyof T,
  updateFormData: <T>(fieldValue: S, key: keyof T) => void
) => {
  const [activeOption, setActiveOption] = useState<S>(defaultOption);
  const [optionList] = useState<S[]>(options);

  useEffect(() => {
    updateFormData<T>(activeOption, key);
  }, [activeOption]);

  const markOption = (selectedOption: S) => {
    optionList.forEach((option) => {
      if (option === selectedOption) {
        setActiveOption(option);
      }
    });
  };

  return {
    inputOptions: optionList,
    activeOption,
    markOption,
  };
};

export default useMultiOptionInput;
