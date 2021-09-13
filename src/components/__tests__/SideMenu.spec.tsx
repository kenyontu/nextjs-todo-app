import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'

import SideMenu from '../SideMenu'

test('Should render correctly', () => {
  const className = 'someclass'
  const onClose = jest.fn()
  const childrenText = 'Children text'

  const { container } = render(
    <SideMenu isOpen={true} className={className} onClose={onClose}>
      <span>{childrenText}</span>
    </SideMenu>
  )

  expect(screen.queryByText(childrenText)).toBeInTheDocument()

  expect(container.firstChild).toHaveClass(className)

  const backdrop = screen.getByTestId('backdrop')
  fireEvent.click(backdrop)
  expect(onClose).toHaveBeenCalledTimes(1)
})
