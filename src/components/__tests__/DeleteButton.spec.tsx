import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'

import DeleteButton from '../DeleteButton'

test('Should apply the className passed as prop', () => {
  const className = 'someclass'
  const onClick = jest.fn()

  render(<DeleteButton className={className} onClick={onClick} />)

  expect(screen.getByTestId('delete-icon-btn')).toHaveClass(className)
})

test('Should fire onClick event correctly', () => {
  const onClick = jest.fn()

  render(<DeleteButton onClick={onClick} />)

  const deleteButton = screen.getByTestId('delete-icon-btn')

  fireEvent.click(deleteButton)
  expect(onClick).toHaveBeenCalledTimes(1)
})
