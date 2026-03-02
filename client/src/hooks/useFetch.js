import { useState, useEffect, useCallback } from "react";
import api from "../services/Api";

const useFetch = (url, options = {}) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchData = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await api.get(url, options);
      setData(response.data);
    } catch (err) {
      setError(err.response ? err.response.data : "Something went wrong");
    } finally {
      setLoading(false);
    }
  }, [url]); // Dependencies can be adjusted based on needs

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return { data, loading, error, refetch: fetchData };
};

export default useFetch;