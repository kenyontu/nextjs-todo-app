import React from 'react'
import { render, screen } from '@testing-library/react'

import AppBar from '../AppBar'

test('Should render correctly', () => {
  const title = 'AppBar title'
  const leftText = 'Left text'
  const rightText = 'Right text'

  const left = <span>{leftText}</span>
  const right = <span>{rightText}</span>

  render(<AppBar title={title} left={left} right={right} />)

  expect(screen.queryByText(title)).toBeInTheDocument()
  expect(screen.queryByText(leftText)).toBeInTheDocument()
  expect(screen.queryByText(rightText)).toBeInTheDocument()
})
