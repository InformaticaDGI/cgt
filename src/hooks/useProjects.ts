import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { config } from "../config";
import type { Parrish } from "./queries/useParrishes";
import type { Secretary } from "./useSecretary";

const useProjects = (params: ProjectQueryParams = {}) => {
  return useQuery({
    queryKey: ["projects", params],
    queryFn: () => getProjects(params),
    initialData: {
      data: [],
      pagination: {
        total: 0,
        page: 1,
        limit: 10,
        totalPages: 0,
        hasNext: false,
        hasPrev: false
      }
    },
  });
};

const getProjects = async ({ include, limit, page, /*municipalityId,*/ parishId, territorialSecretaryId, secretaryId }: ProjectQueryParams = {}): Promise<ProjectMetadata> => {

  const queryParams: ProjectQueryParams = {
    include: include,
    page: page || 1,
    limit: limit || 10,
    territorialSecretaryId,
    secretaryId,
    // municipalityId, //TODO falta este where en el back
    parishId
  }

  // let paramsInclude = "include=parish.municipality,secretary";

  // if (secretaryRootId) {
  //   paramsInclude += `&territorialSecretaryId=${secretaryRootId}`;
  // }

  // if (secretaryId) {
  //   paramsInclude += `&secretaryId=${secretaryId}`;
  // }

  // if (municipalityId) {
  //   //TODO falta este where en el back
  //   console.log("falta en el end point", municipalityId);
  //   // paramsInclude += `&municipalityId=${municipalityId}`;
  // }

  // if (parishId) {
  //   paramsInclude += `&parishId=${parishId}`;
  // }

  // if (secretarialTerritoryId) {
  //   paramsInclude += `&territorialSecretaryId=${secretarialTerritoryId}`;
  // }

  const { data } = await axios.get<ProjectMetadata>(
    `${config.apiUrl}/projects`,
    {
      params: queryParams
    }
  );


  return data;
};

export type ProjectMetadata = {
  data: Project[]
  pagination: {
    total: number
    page: number
    limit: number
    totalPages: number
    hasNext: boolean
    hasPrev: boolean
  }
}

export type Project = {
  id: string;
  name: string;
  initialDate: string;
  finalDate: string;
  actualEndDate: string;
  initialBudget: number;
  actualBudget: number;
  latitude?: number;
  longitude?: number;
  status: "completed" | "in_progress" | "pending";
  observations: string;
  parishId: string;
  parish: Parrish;
  secretaryId: string;
  programId: string;
  directLabor: number;
  indirectLabor: number;
  qualifiedLabor: number;
  unqualifiedLabor: number;
  femaleLabor: number;
  maleLabor: number;
  benefitedPopulation: number;
  benefitedChildren: number;
  createdAt: string;
  updatedAt: string;
  progressByTime: number;
  daysRemaining: number;
  areaId?: string;
  overallProjectProgress: number;
  secretary: Secretary
};

export default useProjects;


type ProjectQueryParams = {
  include?: string;
  page?: number;
  limit?: number;
  territorialSecretaryId?: string;
  secretaryId?: string;
  municipalityId?: string;
  parishId?: string;
}