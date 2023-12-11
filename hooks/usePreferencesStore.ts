import { create } from 'zustand';
import { persist } from 'zustand/middleware';

type UserPreferencesState = {
  darkTheme: boolean;
  toggleTheme: () => void;
};

export const usePreferencesStore = create(
  persist<UserPreferencesState>(
    (set, get) => ({
      darkTheme: false,
      toggleTheme: () => set({ darkTheme: !get().darkTheme })
    }),
    {
      name: 'user-preferences'
    }
  )
);
