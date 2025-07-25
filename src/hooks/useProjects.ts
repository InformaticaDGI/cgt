import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { config } from "../config";
import type { Parrish } from "./queries/useParrishes";
import type { Secretary } from "./useSecretary";

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
