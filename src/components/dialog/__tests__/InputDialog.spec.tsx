import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'

import InputDialog from '../InputDialog'

test('Should render correctly', () => {
  const onDone = jest.fn()
  const onCancel = jest.fn()

  render(
    <InputDialog
      isOpen
      title="Add list"
      inputLabel="List name"
      inputPlaceholder="Enter name"
      inputValue=""
      onDone={onDone}
      onCancel={onCancel}
      ariaHideApp={false}
    />
  )

  expect(screen.queryByText(/Add list/)).toBeInTheDocument()

  const newListName = 'Urgent!'

  const input = screen.getByPlaceholderText(/Enter name/)
  fireEvent.change(input, { target: { value: newListName } })

  const doneBtn = screen.getByText('Done')
  fireEvent.click(doneBtn)
  expect(onDone).toHaveBeenCalledWith(newListName)

  const cancelBtn = screen.getByText('Cancel')
  fireEvent.click(cancelBtn)
  expect(onCancel).toHaveBeenCalledTimes(1)
})

test('Should not trigger onDone when value is not valid', () => {
  const onDone = jest.fn()
  const onCancel = jest.fn()

  render(
    <InputDialog
      isOpen
      title="Add list"
      inputLabel="List name"
      inputPlaceholder="Enter name"
      inputValue=""
      onDone={onDone}
      onCancel={onCancel}
      ariaHideApp={false}
      onValidateValue={(value) => value.length > 0}
    />
  )

  const doneBtn = screen.getByText('Done')
  fireEvent.click(doneBtn)
  expect(onDone).toHaveBeenCalledTimes(0)

  const input = screen.getByPlaceholderText(/Enter name/)
  fireEvent.change(input, { target: { value: 'Urgent!' } })

  fireEvent.click(doneBtn)
  expect(onDone).toHaveBeenCalledTimes(1)
})
