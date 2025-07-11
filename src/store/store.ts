import { create } from 'zustand'
import { devtools } from 'zustand/middleware'

interface AppState {
    secretary_id: string
    territory_id: string
    dependency_id: string
    municipality_id: string
    parrish_id: string,
    setSecretaryId: (secretary_id: string) => void
    setTerritoryId: (territory_id: string) => void
    setDependencyId: (dependency_id: string) => void
    setMunicipalityId: (municipality_id: string) => void
    setParrishId: (parrish_id: string) => void,
}


export const useAppStore = create<AppState>()(
  devtools(
    (set) => ({
     // Initial State
      secretary_id: '',
      territory_id: '',
      dependency_id: '',
      municipality_id: '',
      parrish_id: '',

      // Setter Functions
      setSecretaryId: (secretary_id) => set({ secretary_id }),
      setTerritoryId: (territory_id) => set({ territory_id }),
      setDependencyId: (dependency_id) => set({ dependency_id }),
      setMunicipalityId: (municipality_id) => set({ municipality_id }),
      setParrishId: (parrish_id) => set({ parrish_id }),
    })
  )
)
