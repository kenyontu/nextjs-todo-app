import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'

import Checkbox from '../Checkbox'

test('Should fire onToggle event correctly', () => {
  const onToggle = jest.fn()

  render(<Checkbox isChecked={false} onToggle={onToggle} />)

  const checkbox = screen.getByTestId('checkbox')

  fireEvent.click(checkbox)
  expect(onToggle).toHaveBeenCalledTimes(1)
})
