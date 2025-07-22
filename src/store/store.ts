import { create } from 'zustand'
import { devtools } from 'zustand/middleware'
import type { Secretary } from '../hooks/useSecretary'

interface FormState {
  // Basic Information
  projectName: string;
  projectDescription: string;
  projectInitialDate: string;
  projectFinalDate: string;
  projectAreaId: string;

  // Geolocation
  projectMunicipalityId: string;
  projectParrishId: string;
  projectCommunityCircuitId: string;
  projectLatitude: number;
  projectLongitude: number;

  // Budget
  projectBudgetSource: number
  projectDirectLabor: number
  projectIndirectLabor: number
  projectQualifiedLabor: number
  projectUnqualifiedLabor: number
  projectFemaleLabor: number
  projectMaleLabor: number

  // KPI
  projectKpiInstances: { expected: number, baseKpiId: string }[]
  projectBenefitedPopulation: number
  projectBenefitedChildren: number
}

interface AppState {
  secretaries: Secretary[]
  secretaryRootId: string
  secretarialTerritoryId: string
  secretaryParentId: string
  municipalityId: string
  parrishId: string,
  formState: FormState,
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
      formState: {
        projectName: '',
        projectDescription: '',
        projectInitialDate: '',
        projectFinalDate: '',
        projectAreaId: '',
        projectParrishId: '',
        projectCommunityCircuitId: '',
        projectLatitude: 0,
        projectLongitude: 0,
        projectBudgetSource: 0,
        projectDirectLabor: 0,
        projectIndirectLabor: 0,
      },
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
