import { useQuery } from "@tanstack/react-query";
import { config } from "../../config";
import axios from "axios";

export const useCommunitiesByCircuit = (circuitCode: string) => {
  return useQuery<Community[]>({
    queryKey: ["communities", circuitCode],
    queryFn: async () => {
      return getCommunitiesByCircuit(circuitCode);
    },
    enabled: !!circuitCode,
  });
};

export const getCommunitiesByCircuit = async (circuitCode: string) => {
  const response = await axios.get(`${config.apiUrl}/sectors/community-circuit/${circuitCode}`);
  return response.data;
};

export type Community = {
  id: string;
  name: string;
};
