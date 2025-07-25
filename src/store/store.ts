import { create } from 'zustand'
import { devtools } from 'zustand/middleware'
import type { Secretary } from '../hooks/useSecretary'
import type { KpiInstance } from '../hooks/mutations/useKpiInstances';
import type { Activity } from '../hooks/useActivities';

interface FormState {
  // Basic Information
  projectParentId: string;
  projectSecretaryId: string;
  projectProgramId: string;
  projectName: string;
  projectDescription: string;
  projectInitialDate: string;
  projectFinalDate: string;
  projectAreaId: string;

  // Geolocation
  projectMunicipalityId: string;
  projectParrishId: string;
  projectCommunityCircuitId: string;
  projectCommunityId: string;
  projectLatitude: number;
  projectLongitude: number;

  // Budget
  projectBudgetSourceId: string
  projectBudget: string
  projectBudgetBs: string
  projectBudgetUsd: string
  projectDirectLabor: string
  projectIndirectLabor: string
  projectQualifiedLabor: string
  projectUnqualifiedLabor: string
  projectFemaleLabor: string
  projectMaleLabor: string

  // KPI
  projectKpiInstances: KpiInstance[]
  projectBenefitedPopulation: string
  projectBenefitedChildren: string
}

const initialFormState: FormState = {
  projectParentId: '',
  projectSecretaryId: '',
  projectProgramId: '',
  projectName: '',
  projectDescription: '',
  projectInitialDate: '',
  projectFinalDate: '',
  projectAreaId: '',
  projectParrishId: '',
  projectCommunityCircuitId: '',
  projectCommunityId: '',
  projectLatitude: 9.9156947,
  projectLongitude: -67.3601931,
  projectBudgetSourceId: '',
  projectBudget: '',
  projectBudgetBs: '0,00',
  projectBudgetUsd: '0,00',
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
}


interface AppState {
  activities: Activity[]
  setActivities: (activities: Activity[]) => void
  secretaries: Secretary[]
  secretaryRootId: string
  secretarialTerritoryId: string
  secretaryParentId: string
  municipalityId: string
  parrishId: string,
  formState: FormState,
  resetFormState: () => void,
  setFormState: (formState: FormState) => void,
  setSecretaries: (secretaries: Secretary[]) => void,
  findSecretary: (id: string) => Secretary | undefined,
  setSecretaryRootId: (secretaryRootId: string) => void
  setSecretarialTerritoryId: (SecretarialterritoryId: string) => void
  setSecretaryParentId: (secretaryParentId: string) => void
  setMunicipalityId: (municipalityId: string) => void
  setParrishId: (parrishId: string) => void,
}



export const useAppStore = create<AppState>()(
  devtools(
    (set, get) => ({
      // Initial State
      secretaryRootId: '',
      secretarialTerritoryId: '',
      secretaryParentId: '',
      municipalityId: '',
      parrishId: '',
      secretaries: [],
      activities: [],
      formState: initialFormState,
      setActivities: (activities) => set({ activities }),
      resetFormState: () => set({ formState: initialFormState }),
      setFormState: (formState) => set({ formState }),
      // Setter Functions
      setSecretaries: (secretaries) => set({ secretaries }),
      findSecretary: (id) => get().secretaries.find((secretary) => secretary.id === id),
      setSecretaryRootId: (secretaryRootId) => set({ secretaryRootId }),
      setSecretarialTerritoryId: (secretarialTerritoryId) => set({ secretarialTerritoryId }),
      setSecretaryParentId: (secretaryParentId) => set({ secretaryParentId }),
      setMunicipalityId: (municipalityId) => set({ municipalityId }),
      setParrishId: (parrishId) => set({ parrishId }),
    })
  )
)
