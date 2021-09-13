import React from 'react'
import { render, RenderOptions } from '@testing-library/react'
import { Provider } from 'react-redux'

import { getConfiguredStore, AppPreloadedState } from '../app/store'

type Options = {
  preloadedState?: Partial<AppPreloadedState>
} & RenderOptions

export function renderWithProvider(
  ui: React.ReactElement,
  { preloadedState, ...renderParams }: Options = {}
) {
  const Wrapper = ({ children }: { children: React.ReactElement }) => {
    return (
      <Provider store={getConfiguredStore(preloadedState)}>{children}</Provider>
    )
  }

  return render(ui, { wrapper: Wrapper, ...renderParams })
}
