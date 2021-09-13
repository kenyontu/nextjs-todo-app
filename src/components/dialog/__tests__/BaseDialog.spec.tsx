import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'

import BaseDialog from '../BaseDialog'

test('Should render correctly', () => {
  const dialogTitle = 'Title'
  const dialogText = 'Dialog text'
  const onClose = jest.fn()

  render(
    <BaseDialog
      isOpen
      title={dialogTitle}
      onClose={onClose}
      buttons={[]}
      ariaHideApp={false}
    >
      <span>{dialogText}</span>
    </BaseDialog>
  )

  expect(screen.queryByText(/Title/)).toBeInTheDocument()
  expect(screen.queryByText(/Dialog text/)).toBeInTheDocument()

  // The overlay that receives the clicks outside the dialog can only
  // be retrieved by the class, as it is not visible to the user
  const overlay = document.querySelector('.ReactModal__Overlay')
  expect(overlay).toBeInTheDocument()

  fireEvent.click(overlay)
  expect(onClose).toHaveBeenCalledTimes(1)
})
