import { useState, useEffect } from "react";

// Define la estructura esperada de la respuesta de la API
interface DollarRateData {
  monitors: {
    usd: {
      price: number;
    };
  };
}

/**
 * Hook personalizado para obtener la tasa de cambio del dólar (BCV).
 * @returns Un objeto con la tasa (`rate`), el estado de carga (`loading`)
 * y cualquier error que pueda ocurrir (`error`).
 */
export const useDollarRate = () => {
  const [rate, setRate] = useState<number | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<any>(null);

  useEffect(() => {
    const fetchRate = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          "https://pydolarve.org/api/v1/dollar?page=bcv"
        );
        if (!response.ok) {
          throw new Error("La respuesta de la red no fue correcta");
        }
        const data: DollarRateData = await response.json();
        if (data && data.monitors && data.monitors.usd) {
          setRate(data.monitors.usd.price);
        } else {
          throw new Error("Estructura de datos inválida desde la API");
        }
      } catch (e) {
        setError(e);
        console.error("Error al obtener la tasa del dólar:", e);
      } finally {
        setLoading(false);
      }
    };

    fetchRate();
  }, []); // El array vacío asegura que esto se ejecute solo una vez al montar el componente

  return { rate, loading, error };
};
