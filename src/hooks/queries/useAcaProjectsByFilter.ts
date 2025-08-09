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
  comunityId,
  municipalityId,
  territorialSecretaryId,
  name,
}: AcaProjectsQueryParams) => {
  ///aca-projects?territorialSecretaryId={{territorialSecretaryId}}&municipalityId={{municipalityId}}&communityCircuitId={{communityCircuitId}}&sectorId={{sectorId}}&name={{projectName}}&page=1&pageSize=10",
  const queryParams: any = {};

  if (territorialSecretaryId)
    queryParams.territorialSecretaryId = territorialSecretaryId;
  if (municipalityId) queryParams.municipalityId = municipalityId;
  if (comunityId) queryParams.communityId = comunityId;
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
};

type AcaProjectsQueryParams = {
  comunityId?: string;
  municipalityId?: string;
  territorialSecretaryId?: string;
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
