import { create } from "zustand"
import { persist } from "zustand/middleware"

interface User {
    id: string
    email: string
    name: string
    role: string
  }
  
  interface UserState {
    user: User | null
    token: string | null
    isAuthenticated: boolean
    login: (user: User, token: string) => void
    logout: () => void
  }

  
  export const useAuthStorage = create<UserState>()(
    persist(
      (set) => ({
        user: null,
        token: null,
        isAuthenticated: false,
        login: (user, token) => set({ user, token, isAuthenticated: true }),
        logout: () => set({ user: null, token: null, isAuthenticated: false }),
      }),
      {
        name: 'auth-storage'
      }
    )
  )