import {
  configureStore,
  ThunkAction,
  Action,
  PreloadedState,
} from '@reduxjs/toolkit'

import todosReducer from '../features/todos/todosSlice'

/**
 * Utility function for configuring the redux store
 *
 * @param preloadedState Optional initial state of the store, useful for
 * when writing tests that require the redux store to have a specific initial
 * value
 *
 * @returns a configured redux store
 */
export function getConfiguredStore(preloadedState = {}) {
  return configureStore({
    reducer: {
      todos: todosReducer,
    },
    preloadedState,
  })
}

export const store = getConfiguredStore()

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
export type AppPreloadedState = PreloadedState<RootState>
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>
