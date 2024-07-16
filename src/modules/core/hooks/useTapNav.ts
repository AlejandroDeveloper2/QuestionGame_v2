import { useState } from "react";

const useTapNav = <T>(defaultTap: T) => {
  const [selectedTap, setSelectedTap] = useState<T>(defaultTap);

  const toggleTap = (chosenTap: T): void => {
    setSelectedTap(chosenTap);
  };

  return {
    selectedTap,
    toggleTap,
  };
};
export default useTapNav;
