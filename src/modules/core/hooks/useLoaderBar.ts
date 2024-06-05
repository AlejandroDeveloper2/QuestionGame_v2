/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from "react";

const useLoaderBar = () => {
  const [isScreenLoading, setIsScreenLoading] = useState<boolean>(true);
  const [timeSpan] = useState<number>(200);
  const [load, setLoad] = useState<number>(0);
  const [timeInterval, setTimeInterval] = useState<number>();

  useEffect(() => {
    setTimeInterval(
      window.setInterval(() => {
        setLoad((prevLoad) => prevLoad + 10);
      }, timeSpan)
    );
  }, [timeSpan]);

  useEffect(() => {
    if (load === 100) {
      window.setTimeout(() => {
        setIsScreenLoading(false);
      }, 1000);
      window.clearInterval(timeInterval);
    }
  }, [load]);

  return { isScreenLoading, load };
};

export default useLoaderBar;
