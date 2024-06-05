import { useState } from "react";

import { Loading } from "@core/types/data-types";

const useLoading = () => {
  const [loading, setLoading] = useState<Loading>({
    isLoading: false,
    message: "",
  });

  const toggleLoading = (loadingStatus: Loading): void => {
    setLoading(loadingStatus);
  };

  return {
    loading,
    toggleLoading,
  };
};

export default useLoading;
