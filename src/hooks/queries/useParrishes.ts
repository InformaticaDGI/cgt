import { useQuery } from "@tanstack/react-query";
import { config } from "../../config";
import axios from "axios";
import type { Municipality } from "../useMunicipality";

export const useParrishes = (municipalityId: string) => {
  return useQuery<Parrish[]>({
    queryKey: ["parrishes", municipalityId],
    queryFn: async () => {
      return getParrishes(municipalityId);
    },
    enabled: !!municipalityId,
  });
};
export const getParrishes = async (municipalityId: string) => {
  const response = await axios.get(
    `${config.apiUrl}/parishes/municipality/${municipalityId}`
  );
  return response.data;
};


export type Parrish = {
  id: string;
  name: string;
  latitude: number | null;
  longitude: number | null;
  municipality: Municipality;
  municipalityId: string;
};
