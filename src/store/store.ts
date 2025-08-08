import { create } from "zustand";
import { devtools } from "zustand/middleware";
import type { Secretary } from "../hooks/useSecretary";
import type { KpiInstance } from "../hooks/mutations/useKpiInstances";
import type { Activity } from "../hooks/useActivities";

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
  projectLatitude: number;
  projectLongitude: number;

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
  projectKpiInstances: KpiInstance[]
  projectBenefitedPopulation: string
  projectBenefitedChildren: string
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
  projectLatitude: 9.9156947,
  projectLongitude: -67.3601931,
  projectBudgetSourceId: '',
  projectDirectLabor: '',
  projectIndirectLabor: '',
  projectQualifiedLabor: '',
  projectUnqualifiedLabor: '',
  projectFemaleLabor: '',
  projectMaleLabor: '',
  projectKpiInstances: [],
  projectBenefitedPopulation: '',
  projectBenefitedChildren: '',
  projectMunicipalityId: '',
  projectCommunityId: '',
  projectInitialBudget: '',
  projectInitialBudgetUsd: '',
}


interface AppState {
  secretaries: Secretary[];
  secretaryRootId: string;
  secretarialTerritoryId: string;
  secretaryParentId: string;
  municipalityId: string;
  parrishId: string;
  formState: FormState;
  activities: Activity[];
  resetFormState: () => void;
  setFormState: (formState: FormState) => void;
  setSecretaries: (secretaries: Secretary[]) => void;
  findSecretary: (id: string) => Secretary | undefined;
  setSecretaryRootId: (secretaryRootId: string) => void;
  setSecretarialTerritoryId: (SecretarialterritoryId: string) => void;
  setSecretaryParentId: (secretaryParentId: string) => void;
  setMunicipalityId: (municipalityId: string) => void;
  setParrishId: (parrishId: string) => void;
  setActivities: (activities: Activity[]) => void;
}

export const useAppStore = create<AppState>()(
  devtools((set, get) => ({
    // Initial State
    secretaryRootId: "",
    activities: [],
    secretarialTerritoryId: "",
    secretaryParentId: "",
    municipalityId: "",
    parrishId: "",
    secretaries: [],
    formState: initialFormState,
    resetFormState: () => set({ formState: initialFormState }),
    setFormState: (formState) => set({ formState }),
    setActivities: (activities) => set({ activities }),
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
  }))
);
