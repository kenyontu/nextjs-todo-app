import React from 'react'
import { screen, fireEvent, within } from '@testing-library/react'

import { renderWithProvider } from '../../../test_utils/utils'
import Todos from '../Todos'

test('Should render correctly', () => {
  renderWithProvider(<Todos />, {
    preloadedState: {
      todos: {
        todosById: {
          '1': { id: '1', text: 'Todo 1', isDone: false },
          '2': { id: '2', text: 'Todo 2', isDone: false },
        },
        listIds: ['1'],
        listsById: {
          '1': {
            id: '1',
            name: 'My Todos',
            todos: ['1', '2'],
          },
        },
        selectedListId: '1',
      },
    },
  })

  expect(screen.queryByDisplayValue('Todo 1')).toBeInTheDocument()
  expect(screen.queryByDisplayValue('Todo 2')).toBeInTheDocument()
})

test('Should add a todo', async () => {
  renderWithProvider(<Todos />, {
    preloadedState: {
      todos: {
        todosById: {
          '1': { id: '1', text: 'Todo 1', isDone: false },
          '2': { id: '2', text: 'Todo 2', isDone: false },
        },
        listIds: ['1'],
        listsById: {
          '1': {
            id: '1',
            name: 'My Todos',
            todos: ['1', '2'],
          },
        },
        selectedListId: '1',
      },
    },
  })

  expect(await screen.findAllByRole('listitem')).toHaveLength(2)

  const addTodoInput = screen.getByPlaceholderText(/Add a todo here/)
  fireEvent.focus(addTodoInput)
  fireEvent.change(addTodoInput, { target: { value: 'Todo 3' } })
  fireEvent.keyUp(addTodoInput, { key: '\n' })

  expect(screen.queryByDisplayValue('Todo 3')).toBeInTheDocument()
})

test('Should delete todo', () => {
  renderWithProvider(<Todos />, {
    preloadedState: {
      todos: {
        todosById: {
          '1': { id: '1', text: 'Todo 1', isDone: false },
          '2': { id: '2', text: 'Todo 2', isDone: false },
        },
        listIds: ['1'],
        listsById: {
          '1': {
            id: '1',
            name: 'My Todos',
            todos: ['1', '2'],
          },
        },
        selectedListId: '1',
      },
    },
  })

  // Making sure the there are two todos
  const items = screen.getAllByRole('listitem')
  expect(items).toHaveLength(2)

  // Saves the text of the todo we are going to delete, so we are able to know
  // if it was really deleted
  const todoText = (within(items[1]).getByRole('textbox') as HTMLInputElement)
    .value
  expect(screen.queryByDisplayValue(todoText)).toBeInTheDocument()

  const deleteBtn = within(items[1]).getByTestId('delete-icon-btn')
  fireEvent.click(deleteBtn)

  expect(screen.getAllByRole('listitem')).toHaveLength(1)
  expect(screen.queryByDisplayValue(todoText)).not.toBeInTheDocument()
})

test('Should update a todo', () => {
  renderWithProvider(<Todos />, {
    preloadedState: {
      todos: {
        todosById: {
          '1': { id: '1', text: 'Todo 1', isDone: false },
          '2': { id: '2', text: 'Todo 2', isDone: false },
        },
        listIds: ['1'],
        listsById: {
          '1': {
            id: '1',
            name: 'My Todos',
            todos: ['1', '2'],
          },
        },
        selectedListId: '1',
      },
    },
  })

  const items = screen.getAllByRole('listitem')

  const todoInput = within(items[0]).getByRole('textbox') as HTMLInputElement
  fireEvent.change(todoInput, { target: { value: 'Todo 3' } })

  expect(todoInput).toHaveDisplayValue('Todo 3')
})
