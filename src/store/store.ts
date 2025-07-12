import { create } from 'zustand'
import { devtools } from 'zustand/middleware'

interface AppState {
    secretaryRootId: string
    secretarialTerritoryId: string
    secretaryParentId: string
    municipalityId: string
    parrishId: string,
    setSecretaryRootId: (secretaryRootId: string) => void
    setSecretarialTerritoryId: (SecretarialterritoryId: string) => void
    setSecretaryParentId: (secretaryParentId: string) => void
    setMunicipalityId: (municipalityId: string) => void
    setParrishId: (parrishId: string) => void,
}


export const useAppStore = create<AppState>()(
  devtools(
    (set) => ({
     // Initial State
      secretaryRootId: '',
      secretarialterritoryId: '',
      secretaryParentId: '',
      municipalityId: '',
      parrishId: '',

      // Setter Functions
      setSecretaryRootId: (secretaryRootId) => set({ secretaryRootId }),
      setSecretarialTerritoryId: (secretarialterritoryId) => set({ secretarialTerritoryId: secretarialterritoryId }),
      setSecretaryParentId: (secretaryParentId) => set({ secretaryParentId }),
      setMunicipalityId: (municipalityId) => set({ municipalityId }),
      setParrishId: (parrishId) => set({ parrishId }),
    })
  )
)
