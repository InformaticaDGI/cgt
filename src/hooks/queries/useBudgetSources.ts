import { useEffect, useState } from "react";

export interface BudgetSourceOption {
  value: string;
  label: string;
}

export function useBudgetSources() {
  const [sources, setSources] = useState<BudgetSourceOption[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<null | string>(null);

  useEffect(() => {
    setLoading(true);
    fetch("/budget-sources")
      .then(async (res) => {
        if (!res.ok) throw new Error("Error al cargar fuentes de presupuesto");
        return res.json();
      })
      .then((data) => {
        setSources(
          data.map((item: any) => ({
            value: String(item.id),
            label: item.name
          }))
        );
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  return { sources, loading, error };
}
