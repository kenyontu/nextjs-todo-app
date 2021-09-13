import { createSlice, PayloadAction, createSelector } from '@reduxjs/toolkit'
import { nanoid } from 'nanoid'

import { Todo, TodoBody, List, ListBody } from 'app-types'
import { RootState } from '../../app/store'

export const DEFAULT_LIST_ID = '1'

export type TodosState = {
  todosById: { [key: string]: Todo }
  listIds: string[]
  listsById: { [key: string]: List }
  selectedListId: string
}

const initialState: TodosState = {
  todosById: {},
  listIds: [DEFAULT_LIST_ID],
  listsById: {
    [DEFAULT_LIST_ID]: { id: DEFAULT_LIST_ID, name: 'My Todos', todos: [] },
  },
  selectedListId: DEFAULT_LIST_ID,
}

export const todosSlice = createSlice({
  name: 'todos',
  initialState,
  reducers: {
    addTodo(state, action: PayloadAction<TodoBody>) {
      const id = nanoid()
      state.todosById[id] = { ...action.payload, id }
      state.listsById[state.selectedListId].todos.push(id)
    },
    editTodo(state, action: PayloadAction<{ id: string; todo: TodoBody }>) {
      state.todosById[action.payload.id] = {
        ...state.todosById[action.payload.id],
        ...action.payload.todo,
      }
    },
    deleteTodo(state, action: PayloadAction<string>) {
      const { selectedListId } = state

      // If found, remove the todo from its list
      const index = state.listsById[selectedListId].todos.findIndex(
        (id) => id === action.payload
      )
      if (index !== -1) {
        state.listsById[selectedListId].todos = [
          ...state.listsById[selectedListId].todos.slice(0, index),
          ...state.listsById[selectedListId].todos.slice(index + 1),
        ]
      }

      delete state.todosById[action.payload]
    },
    addList(state, action: PayloadAction<ListBody>) {
      const id = nanoid()
      state.listIds.push(id)
      state.listsById[id] = { ...action.payload, id }
      state.selectedListId = id
    },
    editList(state, action: PayloadAction<{ id: string; list: ListBody }>) {
      state.listsById[action.payload.id] = {
        ...state.listsById[action.payload.id],
        ...action.payload.list,
      }
    },
    deleteList(state, action: PayloadAction<string>) {
      const deletedId = action.payload
      const index = state.listIds.findIndex((id) => id === deletedId)

      // If the list was not found or it is the default one, stop here
      if (index <= 0) return

      state.selectedListId = DEFAULT_LIST_ID

      state.listIds = [
        ...state.listIds.slice(0, index),
        ...state.listIds.slice(index + 1),
      ]
      delete state.listsById[deletedId]
    },
    setSelectedList(state, action: PayloadAction<string>) {
      state.selectedListId = action.payload
    },
  },
})

export const {
  addTodo,
  editTodo,
  deleteTodo,
  addList,
  editList,
  deleteList,
  setSelectedList,
} = todosSlice.actions

export const todosSelector = (rootState: RootState) => rootState.todos

export const selectTodo = (id: string) =>
  createSelector(todosSelector, (state) => state.todosById[id])

export const selectListIds = () =>
  createSelector(todosSelector, (state) => state.listIds)

export const selectList = (id: string) =>
  createSelector(todosSelector, (state) => state.listsById[id])

export const selectTodoIds = () =>
  createSelector(
    todosSelector,
    (state) => state.listsById[state.selectedListId].todos
  )

export const selectSelectedList = () =>
  createSelector(
    todosSelector,
    (state) => state.listsById[state.selectedListId]
  )

/**
 * Counts the number of pending todos in a given list
 * @param listId The ID of the list which will have its todos counted
 * @returns The number of pending todos
 */
export const selectTodoCount = (listId: string) =>
  createSelector(todosSelector, (state) =>
    state.listsById[listId].todos.reduce(
      (count, todoId) => (state.todosById[todoId].isDone ? count : count + 1),
      0
    )
  )

export default todosSlice.reducer
