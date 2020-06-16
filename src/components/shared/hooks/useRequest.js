import { useState, useCallback } from "react";

export default () => {
  const [isLoading, setIsLoading] = useState(false);

  const [isError, setIsError] = useState("");

  const sendRequest = useCallback(
    async (url, method = "GET", headers = {}, body = null) => {
      setIsLoading(true);
      let data;
      try {
        const result = await fetch(url, {
          method,
          headers,
          body,
        });
        data = await result.json();
        if (!result.ok) throw new Error(data.message);
      } catch (error) {
        console.log(error);
        data = null;
        setIsError(error.message);
      }
      setIsLoading(false);
      return data;
    },
    []
  );

  const clearError = () => setIsError("");

  return [isLoading, isError, sendRequest, clearError];
};
