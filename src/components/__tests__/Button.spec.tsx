import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'

import Button from '../Button'

test('Should render correctly', () => {
  const onClick = jest.fn()
  const { container } = render(<Button onClick={onClick}>Click me!</Button>)

  expect(screen.queryByText(/Click me!/)).toBeInTheDocument()

  const deleteButton = container.firstChild

  fireEvent.click(deleteButton)
  expect(onClick).toHaveBeenCalledTimes(1)
})
