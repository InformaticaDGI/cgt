import { useQuery } from "@tanstack/react-query";
import { config } from "../../config";
import axios from "axios";

export const useCommunityCircuits = (props: UseCommunityCircuitsProps = {}) => {
  return useQuery<CommunityCircuit[]>({
    queryKey: ["community-circuits", props.municipalityId, props.parishId],
    queryFn: async () => getQueryFn(props),
    enabled: getEnabled(props),
  });
};

type UseCommunityCircuitsProps = {
  parishId?: string
  municipalityId?: string[]
}

const getQueryFn = async (props: UseCommunityCircuitsProps) => {
  if (props.municipalityId) {
    return getCommunityCircuitsByMunicipality(props.municipalityId)
  } else if (props.parishId) {
    return getCommunityCircuitsByParish(props.parishId)
  }
  return []
}

const getEnabled = (props: UseCommunityCircuitsProps) => {
  if (!props.municipalityId && !props.parishId) {
    return false
  }
  return true
}

export const getCommunityCircuitsByMunicipality = async (municipalityId: string[]) => {
  const response = await axios.post(
    `${config.apiUrl}/community-circuits/municipalities`, {
      municipalities: municipalityId
    } 
  );
  return response.data;
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
  code: string;
  latitude: number | null;
  longitude: number | null;
};
