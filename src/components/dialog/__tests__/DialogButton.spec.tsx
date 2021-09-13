import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'

import DialogButton from '../DialogButton'

test('Should render DialogButton correctly', () => {
  const className = 'someclass'
  const onClick = jest.fn()
  const buttonText = 'Click me!'

  const { rerender } = render(
    <DialogButton className={className} onClick={onClick}>
      {buttonText}
    </DialogButton>
  )

  const button = screen.getByText(buttonText)
  expect(button).toHaveClass(className)

  fireEvent.click(button)
  expect(onClick).toBeCalledTimes(1)

  // Should not trigger clicks when disabled
  rerender(
    <DialogButton className={className} onClick={onClick} isDisabled>
      {buttonText}
    </DialogButton>
  )

  fireEvent.click(button)
  expect(onClick).toBeCalledTimes(1)
})
