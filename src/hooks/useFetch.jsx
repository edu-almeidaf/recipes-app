import { useState, useEffect } from 'react';

export default function useFetch(fetchFn) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [data, setData] = useState(null);

  useEffect(() => {
    async function fetchData() {
      try {
        setIsLoading(true);

        const dataApi = await fetchFn();

        setData(dataApi);
      } catch (errorApi) {
        setError('Erro ao executar a requisição.');
      } finally {
        setIsLoading(false);
      }
    }

    fetchData();
  }, []);

  return [data, isLoading, error];
}
