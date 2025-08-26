import { create } from "zustand";
import { devtools } from "zustand/middleware";
import type { Secretary } from "../hooks/useSecretary";
import type { KpiInstance } from "../hooks/mutations/useKpiInstances";

interface FormState {
  // Basic Information
  projectParentId: string;
  projectSecretaryId: string;
  projectProgramId: string;
  projectName: string;
  projectDescription: string;
  projectInitialDate: string;
  projectFinalDate: string;
  projectAreaId: string[];

  // Geolocation
  projectMunicipalityId: string;
  projectParrishId: string;
  projectCommunityCircuitCode: string;
  projectCommunityId: string;
  projectAcaProjectId: string;
  projectLatitude: number;
  projectLongitude: number;
  projectIsNonLocation: boolean;

  // Budget
  projectBudgetSourceId: string;
  projectInitialBudget: string;
  projectInitialBudgetUsd: string;
  projectDirectLabor: string;
  projectIndirectLabor: string;
  projectQualifiedLabor: string;
  projectUnqualifiedLabor: string;
  projectFemaleLabor: string;
  projectMaleLabor: string;

  // KPI
  projectKpiInstances: KpiInstance[];
  projectBenefitedPopulation: string;
  projectBenefitedChildren: string;
}

const initialFormState: FormState = {
  projectParentId: "",
  projectSecretaryId: "",
  projectProgramId: "",
  projectName: "",
  projectDescription: "",
  projectInitialDate: "",
  projectFinalDate: "",
  projectAreaId: [],
  projectParrishId: "",
  projectCommunityCircuitCode: "",
  projectAcaProjectId: "",
  projectLatitude: 0,
  projectLongitude: 0,
  projectBudgetSourceId: "",
  projectDirectLabor: "",
  projectIndirectLabor: "",
  projectQualifiedLabor: "",
  projectUnqualifiedLabor: "",
  projectFemaleLabor: "",
  projectMaleLabor: "",
  projectKpiInstances: [],
  projectBenefitedPopulation: "",
  projectBenefitedChildren: "",
  projectMunicipalityId: "",
  projectCommunityId: "",
  projectInitialBudget: "",
  projectInitialBudgetUsd: "",
  projectIsNonLocation: false,
};

interface AppState {
  secretaries: Secretary[];
  secretaryRootId: string;
  secretarialTerritoryId: string;
  secretaryParentId: string;
  municipalityId: string;
  parrishId: string;
  circuitId: string;
  communityId: string;
  formState: FormState;
  openFilter: boolean;
  setOpenFilter: (openFilter: boolean) => void;
  resetFormState: () => void;
  setFormState: (formState: FormState) => void;
  setProjectIsNonLocation: (projectIsNonLocation: boolean) => void;
  setSecretaries: (secretaries: Secretary[]) => void;
  findSecretary: (id: string) => Secretary | undefined;
  setSecretaryRootId: (secretaryRootId: string) => void;
  setSecretarialTerritoryId: (SecretarialterritoryId: string) => void;
  setSecretaryParentId: (secretaryParentId: string) => void;
  setMunicipalityId: (municipalityId: string) => void;
  setParrishId: (parrishId: string) => void;
  setCircuitId: (circuitId: string) => void;
  setCommunityId: (communityId: string) => void;
}

export const useAppStore = create<AppState>()(
  devtools((set, get) => ({
    // Initial State
    secretaryRootId: "",
    secretarialTerritoryId: "",
    secretaryParentId: "",
    municipalityId: "",
    parrishId: "",
    circuitId: "",
    communityId: "",
    secretaries: [],
    formState: initialFormState,
    openFilter: false,
    setOpenFilter: (openFilter) => set({ openFilter }),
    resetFormState: () => set({ formState: initialFormState }),
    setProjectIsNonLocation: (projectIsNonLocation) => {
      const formState = get().formState;
      formState.projectIsNonLocation = projectIsNonLocation;
      set({ formState });
    },
    setFormState: (formState) => set({ formState }),
    // Setter Functions
    setSecretaries: (secretaries) => set({ secretaries }),
    findSecretary: (id) =>
      get().secretaries.find((secretary) => secretary.id === id),
    setSecretaryRootId: (secretaryRootId) => set({ secretaryRootId }),
    setSecretarialTerritoryId: (secretarialTerritoryId) =>
      set({ secretarialTerritoryId }),
    setSecretaryParentId: (secretaryParentId) => set({ secretaryParentId }),
    setMunicipalityId: (municipalityId) => set({ municipalityId }),
    setParrishId: (parrishId) => set({ parrishId }),
    setCircuitId: (circuitId) => set({ circuitId }),
    setCommunityId: (communityId) => set({ communityId }),
  }))
);
