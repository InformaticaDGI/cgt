import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { config } from "../config";
import type { Parrish } from "./queries/useParrishes";
import type { Secretary } from "./useSecretary";
import { useAppStore } from "../store/store";

const useProjects = () => {
  return useQuery({
    queryKey: ["projects"],
    queryFn: getProjects,
    initialData: [],
  });
};

const getProjects = async (): Promise<Project[]> => {
  const { data } = await axios.get<Project[]>(
    `${config.apiUrl}/projects/with-kpi-instances/list`
  );
  return data;
};

export const useProjectsInclude = () => {
  const {
    secretarialTerritoryId,
    secretaryParentId,
    secretaryRootId,
    municipalityId,
    parrishId,
  } = useAppStore();

  return useQuery({
    queryKey: [
      "projects-include",
      secretarialTerritoryId,
      secretaryParentId,
      secretaryRootId,
      municipalityId,
      parrishId,
    ],
    queryFn: () =>
      getProjectsInclude({
        secretarialTerritoryId,
        secretaryParentId,
        secretaryRootId,
        municipalityId,
        parrishId,
      }),
    initialData: [],
  });
};

const getProjectsInclude = async (params: {
  secretarialTerritoryId: string;
  secretaryParentId: string;
  secretaryRootId: string;
  municipalityId: string;
  parrishId: string;
}): Promise<Project[]> => {
  const {
    secretaryParentId,
    secretarialTerritoryId,
    municipalityId,
    parrishId,
  } = params;

  let paramsInclude = "include=parish,secretary";

  // if (secretaryRootId) {
  //   paramsInclude += `&territorialSecretaryId=${secretaryRootId}`;
  // }

  if (secretaryParentId) {
    paramsInclude += `&secretaryId=${secretaryParentId}`;
  }

  if (municipalityId) {
    //TODO falta este where en el back
    console.log("falta en el end point", municipalityId);
    // paramsInclude += `&municipalityId=${municipalityId}`;
  }

  if (parrishId) {
    paramsInclude += `&parishId=${parrishId}`;
  }

  if (secretarialTerritoryId) {
    paramsInclude += `&territorialSecretaryId=${secretarialTerritoryId}`;
  }
  console.log(`${config.apiUrl}/projects?${paramsInclude}&limit=100`);
  const { data } = await axios.get<{ data: Project[] }>(
    `${config.apiUrl}/projects?${paramsInclude}&limit=100`
  );
  return data.data;
};

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
  secretary: Secretary;
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
};

export default useProjects;
