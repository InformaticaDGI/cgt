import { useQuery } from "@tanstack/react-query";
import { config } from "../../config";
import axios from "axios";

export const useCommunitiesByCircuit = (circuitId: string) => {
  return useQuery<Community[]>({
    queryKey: ["communities", circuitId],
    queryFn: async () => {
      return getCommunitiesByCircuit(circuitId);
    },
    enabled: !!circuitId,
  });
};

export const getCommunitiesByCircuit = async (circuitId: string) => {
  const response = await axios.get(`${config.apiUrl}/sectors/community-circuit/${circuitId}`);
  return response.data;
};

export type Community = {
  id: string;
  name: string;
};
