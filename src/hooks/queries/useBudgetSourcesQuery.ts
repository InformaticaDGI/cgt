import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { config } from "../../config";

export interface BudgetSource {
  id: string;
  name: string;
}

const getBudgetSources = async (): Promise<BudgetSource[]> => {
  const response = await axios.get(`${config.apiUrl}/budget-sources`);
  return response.data;
};

export const useBudgetSourcesQuery = () => {
  return useQuery<BudgetSource[]>({
    queryKey: ["budget-sources"],
    queryFn: getBudgetSources,
  });
};
