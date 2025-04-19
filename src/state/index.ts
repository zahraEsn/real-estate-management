import { createSlice, PayloadAction } from "@reduxjs/toolkit"

export interface FiltersState {
  location: string
  beds: string
  baths: string
  propertyType: string
  amenities: string[]
  availableForm: string
  priceRange: [null, null]
  squareFeet: [null, null]
  coordinates: [number, number]
}

interface InitialStateType {
  filters: FiltersState
  isFiltersFullOpen: boolean
  viewMode: "grid" | "list"
}

export const initialState: InitialStateType = {
  filters: {
    location: "Los Angeles",
    beds: "any",
    baths: "any",
    propertyType: "any",
    amenities: [],
    availableForm: "any",
    priceRange: [null, null],
    squareFeet: [null, null],
    coordinates: [-118.25, 34.05],
  },
  isFiltersFullOpen: false,
  viewMode: "grid",
}

export const globalSlice = createSlice({
  name: "global",
  initialState,
  reducers: {
    setFilters: (state, action: PayloadAction<Partial<FiltersState>>) => {
      state.filters = { ...state.filters, ...action.payload }
    },
    toggleFiltersFullOpen: (state) => {
      state.isFiltersFullOpen = !state.isFiltersFullOpen
    },
    setViewMode: (state, action: PayloadAction<"grid" | "list">) => {
      state.viewMode = action.payload
    },
  },
})

export const { setFilters, toggleFiltersFullOpen, setViewMode } =
  globalSlice.actions
export default globalSlice.reducer
