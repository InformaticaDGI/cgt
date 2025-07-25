import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { config } from "../config";
import type { Parrish } from "./queries/useParrishes";
import type { Secretary } from "./useSecretary";

const useProjects = () => {
  return useQuery({
    queryKey: ["projects"],
    queryFn: getProjects,
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

const getProjects = async (): Promise<ProjectMetadata> => {
  const { data } = await axios.get<ProjectMetadata>(
    `${config.apiUrl}/projects?include=parish,secretary`
  );
  return data;
};

export const useProjectsInclude = () => {
  return useQuery({
    queryKey: ["projects-include"],
    queryFn: getProjectsInclude,
    initialData: [],
  });
};

const getProjectsInclude = async (): Promise<Project[]> => {
  const { data } = await axios.get<{ data: Project[] }>(
    `${config.apiUrl}/projects?include=parish,secretary&limit=100`
  );
  return data.data;
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
