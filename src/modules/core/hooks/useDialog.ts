import { useState } from "react";

const useDialog = () => {
  const [isDialogVisible, setIsDialogVisible] = useState<boolean>(false);
  const [elementId, setElementId] = useState<string>("");

  const toggleDialog = (elementId: string): void => {
    setIsDialogVisible(!isDialogVisible);
    setElementId(elementId);
  };

  return {
    isDialogVisible,
    elementId,
    toggleDialog,
  };
};
export default useDialog;
