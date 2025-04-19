"use client"

import { combineReducers, configureStore } from "@reduxjs/toolkit"
import globalReducer from "@/state"
import { api } from "@/state/api"
import { useRef } from "react"
import { setupListeners } from "@reduxjs/toolkit/query"
import { Provider, useDispatch } from "react-redux"

/* Redux Store */
const rootReducer = combineReducers({
  global: globalReducer,
  [api.reducerPath]: api.reducer,
})

export const makeStore = () => {
	return configureStore({
		reducer: rootReducer,
		middleware: (getDefaultMiddleware) : any => {
			getDefaultMiddleware().concat(api.middleware)
		}
	})
}

/* Redux Type */
export type AppStore = ReturnType<typeof makeStore>

/* Provider */
export default function StoreProvider({
  children,
}: {
  children: React.ReactNode
}) {
  const storeRef = useRef<AppStore | null>(null)
  if (!storeRef.current) {
    storeRef.current = makeStore()
    setupListeners(storeRef.current.dispatch)
  }
  return <Provider store={storeRef.current}>{children}</Provider>
}
