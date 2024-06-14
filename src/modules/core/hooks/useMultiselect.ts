import useListInputControl from "./useListInputControl";

const useMultiselect = <T, S>(
  selectedOptions: S[],
  key: keyof T,
  updateFormData: <T>(fieldValue: S | S[], key: keyof T) => void
) => {
  return useListInputControl<T, S>(selectedOptions, key, updateFormData);
};

export default useMultiselect;
