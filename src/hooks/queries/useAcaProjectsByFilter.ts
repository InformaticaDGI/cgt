import { useQuery } from "@tanstack/react-query";
import { config } from "../../config";
import axios from "axios";

export const useAcaProjectsByFilter = (params: AcaProjectsQueryParams = {}) => {
  return useQuery<AcaProjectResponde>({
    queryKey: ["aca-projects", params],
    queryFn: async () => {
      return getAcaProjectsByFilter(params);
    },
    initialData: {
      data: [],
      pagination: {
        total: 0,
        page: 1,
        limit: 10,
        totalPages: 0,
        hasNext: false,
        hasPrev: false,
      },
    },
  });
};

export const getAcaProjectsByFilter = async ({
  territorialSecretaryId,
  municipalityId,
  sectorId,
  name,
  all,
}: AcaProjectsQueryParams) => {
  if (
    all &&
    (territorialSecretaryId === "" || territorialSecretaryId === undefined) &&
    (municipalityId === "" || municipalityId === undefined) &&
    (sectorId === "" || sectorId === undefined) &&
    (name === "" || name === undefined)
  ) {
    const response = await axios.get(`${config.apiUrl}/aca-projects`);

    return response.data;
  }

  const queryParams: any = {};
  queryParams.territorialSecretaryId = territorialSecretaryId;
  if (municipalityId) queryParams.municipalityId = municipalityId;

  //TODO ajustar en backend que el codigo communityCircuitId sea el codeCircuit
  //if (communityCircuitId) queryParams.communityCircuitId = communityCircuitId;
  if (sectorId) queryParams.sectorId = sectorId;
  if (name) queryParams.name = name;

  const response = await axios.get(`${config.apiUrl}/aca-projects`, {
    params: queryParams,
  });

  return response.data;
};

export type AcaProject = {
  id: string;
  name: string;
  areaId: string;
  territorialSecretaryId: string;
  municipalityId: string;
  communityCircuitId?: string;
  sectorId?: string;
  projectCount: number;
};

type AcaProjectsQueryParams = {
  municipalityId?: string;
  communityCircuitId?: string;
  sectorId?: string;
  territorialSecretaryId?: string;
  all?: boolean;
  name?: string;
};

type AcaProjectResponde = {
  data: AcaProject[];
  pagination: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
    hasNext: boolean;
    hasPrev: boolean;
  };
};
