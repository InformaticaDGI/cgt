import { useQuery } from "@tanstack/react-query";
import { config } from "../../config";
import axios from "axios";

export const useCommunityCircuitsByParish = (parishId: string) => {
  return useQuery<CommunityCircuit[]>({
    queryKey: ["community-circuits", parishId],
    queryFn: async () => {
      return getCommunityCircuitsByParish(parishId);
    },
    enabled: !!parishId,
  });
};

export const getCommunityCircuitsByParish = async (parishId: string) => {
  const response = await axios.get(
    `${config.apiUrl}/community-circuits/parish/${parishId}`
  );
  return response.data;
};

export type CommunityCircuit = {
  id: string;
  name: string;
  latitude: number | null;
  longitude: number | null;
};
