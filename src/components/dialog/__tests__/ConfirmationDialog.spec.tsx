import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'

import ConfirmationDialog from '../ConfirmationDialog'

test('Should render correctly', () => {
  const onYes = jest.fn()
  const onNo = jest.fn()

  render(
    <ConfirmationDialog
      isOpen
      title="Item deletion"
      message="Are you sure you want to delete item X?"
      onYes={onYes}
      onNo={onNo}
      ariaHideApp={false}
    />
  )

  expect(screen.queryByText(/Item deletion/)).toBeInTheDocument()
  expect(
    screen.queryByText(/Are you sure you want to delete item X\?/)
  ).toBeInTheDocument()

  const yesBtn = screen.getByText(/Yes/)
  fireEvent.click(yesBtn)
  expect(onYes).toHaveBeenCalledTimes(1)

  const noBtn = screen.getByText(/No/)
  fireEvent.click(noBtn)
  expect(onNo).toHaveBeenCalledTimes(1)
})
