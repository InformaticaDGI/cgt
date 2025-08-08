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
  sectorId,
  municipalityId,
  territorialSecretaryId,
  name,
}: AcaProjectsQueryParams) => {
  ///aca-projects?
  //territorialSecretaryId={{territorialSecretaryId}}&
  // municipalityId={{municipalityId}}&
  // communityCircuitId={{communityCircuitId}}&
  // sectorId={{sectorId}}&name={{projectName}}&page=1&pageSize=10",

  /*
"id": "5bc82c1c-1b6e-437b-8361-46ab0bda8548",
      "name": "Proyecto ACA SAN JUAN",
      "areaId": "69bc0778-2008-4bc2-b572-7f4ecb611bb9",
      "territorialSecretaryId": "ts-001",
      "municipalityId": "mun-001",
      "communityCircuitId": "95dd036e-2b18-4860-93e8-9772d9d0c49d",
      "sectorId": "2fffa26d-7c49-4de1-b304-5381bfb9ea06",
  */
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
};

type AcaProjectsQueryParams = {
  municipalityId?: string;
  communityCircuitId?: string;
  sectorId?: string;
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
