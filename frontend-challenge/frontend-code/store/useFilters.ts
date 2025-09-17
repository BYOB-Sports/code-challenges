import { create } from "zustand"
import { persist } from "zustand/middleware"
import type { FilterOptions, SortOption } from "@/types"

interface FiltersState {
  searchQuery: string
  filters: FilterOptions
  sortBy: SortOption
  setSearchQuery: (query: string) => void
  setFilters: (filters: FilterOptions) => void
  setSortBy: (sortBy: SortOption) => void
  clearFilters: () => void
  hasActiveFilters: () => boolean
}

const initialFilters: FilterOptions = {}

export const useFilters = create<FiltersState>()(
  persist(
    (set, get) => ({
      searchQuery: "",
      filters: initialFilters,
      sortBy: "rating",

      setSearchQuery: (query) => set({ searchQuery: query }),

      setFilters: (filters) => set({ filters }),

      setSortBy: (sortBy) => set({ sortBy }),

      clearFilters: () =>
        set({
          searchQuery: "",
          filters: initialFilters,
        }),

      hasActiveFilters: () => {
        const state = get()
        return (
          state.searchQuery.length > 0 ||
          Object.values(state.filters).some((value) => value !== undefined && value !== "")
        )
      },
    }),
    {
      name: "tennis-courts-filters",
      partialize: (state) => ({
        filters: state.filters,
        sortBy: state.sortBy,
      }),
    },
  ),
)
