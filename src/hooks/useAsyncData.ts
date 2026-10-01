import { useEffect, useState } from 'react';

export function useAsyncData<T>(load: () => Promise<T>, initialValue: T) {
  const [data, setData] = useState(initialValue);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let active = true;
    setLoading(true);
    load()
      .then((result) => { if (active) setData(result); })
      .catch(() => { if (active) setError('Não foi possível carregar os dados. Tente novamente.'); })
      .finally(() => { if (active) setLoading(false); });
    return () => { active = false; };
  }, [load]);

  return { data, loading, error };
}