import React from 'react'
import { screen, fireEvent, within } from '@testing-library/react'
import { renderWithProvider } from '../../../test_utils/utils'

import AddListDialog from '../AddListDialog'
import RenameListDialog from '../RenameListDialog'
import DeleteListDialog from '../DeleteListDialog'
import Lists from '../Lists'
import { useAppSelector } from '../../../app/hooks'
import { selectSelectedList } from '../todosSlice'

test('Should add lists correctly', async () => {
  const onCloseAddDialog = jest.fn()
  const onSelectedListChange = jest.fn()
  const onAddListClick = jest.fn()

  const { rerender } = renderWithProvider(
    <div>
      <AddListDialog
        isOpen={false}
        onClose={onCloseAddDialog}
        key="add-list-dialog"
      />
      <Lists
        onSelectedListChange={onSelectedListChange}
        onAddListClick={onAddListClick}
      />
    </div>
  )

  const addListBtn = screen.getByTestId('add-list-btn')
  fireEvent.click(addListBtn)
  expect(onAddListClick).toHaveBeenCalledTimes(1)

  rerender(
    <div>
      <AddListDialog
        isOpen
        onClose={onCloseAddDialog}
        key="add-list-dialog"
        ariaHideApp={false}
      />
      <Lists
        onSelectedListChange={onSelectedListChange}
        onAddListClick={onAddListClick}
      />
    </div>
  )

  fireEvent.click(screen.getByText(/Cancel/i))
  expect(onCloseAddDialog).toHaveBeenCalledTimes(1)

  const doneBtn = screen.getByText(/Done/i)

  // The add list dialog input is empty, so it should not trigger the
  // list creation and close the dialog
  fireEvent.click(doneBtn)
  expect(onCloseAddDialog).toHaveBeenCalledTimes(1)

  const addListInput = screen.getByPlaceholderText(/Enter name/)
  fireEvent.change(addListInput, { target: { value: 'New list' } })
  fireEvent.click(doneBtn)

  expect(onCloseAddDialog).toHaveBeenCalledTimes(2)
  expect(onCloseAddDialog).toHaveBeenCalledWith(true)

  // Search for the new list
  await within(screen.getByRole('list')).findByText(/New list/)

  // Selected list change
  expect(onSelectedListChange).toHaveBeenCalledTimes(0)
  fireEvent.click(within(screen.getByRole('list')).getAllByRole('listitem')[0])
  expect(onSelectedListChange).toHaveBeenCalledTimes(1)
})

test('Should rename list correctly', async () => {
  const onRenameDialogClose = jest.fn()
  const onSelectedListChange = jest.fn()
  const onAddListClick = jest.fn()

  renderWithProvider(
    <div>
      <RenameListDialog
        isOpen
        onClose={onRenameDialogClose}
        listId="2"
        ariaHideApp={false}
      />
      <Lists
        onAddListClick={onAddListClick}
        onSelectedListChange={onSelectedListChange}
      />
    </div>,
    {
      preloadedState: {
        todos: {
          todosById: {},
          listIds: ['1', '2'],
          listsById: {
            '1': {
              id: '1',
              name: 'My Todos',
              todos: [],
            },
            '2': {
              id: '2',
              name: 'Tomorrow',
              todos: [],
            },
          },
          selectedListId: '2',
        },
      },
    }
  )

  const renameDialogCancelBtn = screen.getByText(/Cancel/i)
  fireEvent.click(renameDialogCancelBtn)
  expect(onRenameDialogClose).toHaveBeenCalledTimes(1)

  const changeInputText = (text) =>
    fireEvent.change(screen.getByPlaceholderText(/Enter name/), {
      target: { value: text },
    })

  // Should not pass validation
  changeInputText('')
  const renameDialogDoneBtn = screen.getByText(/Done/i)
  fireEvent.click(renameDialogDoneBtn)
  expect(onRenameDialogClose).toHaveBeenCalledTimes(1)

  changeInputText('Today')
  fireEvent.click(renameDialogDoneBtn)
  expect(onRenameDialogClose).toHaveBeenCalledTimes(2)

  const listItems = screen.getAllByRole('listitem')
  expect(within(listItems[1]).queryByText(/Tomorow/)).not.toBeInTheDocument()
  expect(within(listItems[1]).queryByText(/Today/)).toBeInTheDocument()
})

test('Should delete a list correctly', () => {
  const DeleteListComponent = () => {
    const selectedList = useAppSelector(selectSelectedList())
    return (
      <>
        <DeleteListDialog
          isOpen
          onClose={onDeleteDialogClose}
          listId={selectedList.id}
          ariaHideApp={false}
        />
        <Lists
          onAddListClick={onAddListClick}
          onSelectedListChange={onSelectedListChange}
        />
      </>
    )
  }

  const onDeleteDialogClose = jest.fn()
  const onSelectedListChange = jest.fn()
  const onAddListClick = jest.fn()

  renderWithProvider(<DeleteListComponent />, {
    preloadedState: {
      todos: {
        todosById: {},
        listIds: ['1', '2'],
        listsById: {
          '1': {
            id: '1',
            name: 'My Todos',
            todos: [],
          },
          '2': {
            id: '2',
            name: 'Today',
            todos: [],
          },
        },
        selectedListId: '2',
      },
    },
  })

  fireEvent.click(screen.getByText(/No/i))
  expect(onDeleteDialogClose).toHaveBeenCalledTimes(1)

  fireEvent.click(screen.getByText(/Yes/i))
  expect(onDeleteDialogClose).toHaveBeenCalledTimes(2)

  const listItems = screen.getAllByRole('listitem')
  expect(listItems.length).toBe(1)
  expect(within(listItems[0]).queryByText(/Today/)).not.toBeInTheDocument()
  expect(within(listItems[0]).queryByText(/My Todos/)).toBeInTheDocument()
})
