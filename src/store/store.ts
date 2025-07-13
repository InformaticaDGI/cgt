import { create } from 'zustand'
import { devtools } from 'zustand/middleware'
import type { Secretary } from '../hooks/useSecretary'

interface AppState {

    secretaries: Secretary[]
    secretaryRootId: string
    secretarialTerritoryId: string
    secretaryParentId: string
    municipalityId: string
    parrishId: string,
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
