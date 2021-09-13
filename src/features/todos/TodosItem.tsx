import { useState } from 'react'
import classNames from 'classnames'
import { useDebouncedCallback } from 'use-debounce'

import styles from './TodosItem.module.css'
import { useAppSelector, useAppDispatch } from '../../app/hooks'
import { editTodo, deleteTodo, selectTodo } from './todosSlice'
import Checkbox from '../../components/Checkbox'
import DeleteButton from '../../components/DeleteButton'

type Props = {
  id: string
}

function TodosItem({ id }: Props) {
  const todo = useAppSelector(selectTodo(id))
  const dispatch = useAppDispatch()
  const [text, setText] = useState(todo.text)
  const [isDone, setIsDone] = useState(todo.isDone)

  const debouncedEdit = useDebouncedCallback(() => {
    dispatch(editTodo({ id, todo: { ...todo, isDone, text } }))
  }, 500)

  return (
    <div
      role="listitem"
      className={`${styles.todo} flex items-center p-2 pl-4 bg-white rounded-md mb-2 last:mb-0 shadow-todo ring-accent hover:ring-2 focus-within:ring-2`}
    >
      <Checkbox
        isChecked={isDone}
        onToggle={() => {
          setIsDone((value) => !value)
          debouncedEdit()
        }}
      />
      <input
        type="text"
        className={classNames(
          'flex-1 ml-2 bg-transparent text-gray-900 placeholder-gray-400 outline-none p-2 rounded-md',
          { 'text-opacity-50 line-through': isDone }
        )}
        placeholder="Enter todo text"
        value={text}
        onChange={(event) => {
          setText(event.target.value)
          debouncedEdit()
        }}
      />
      <DeleteButton
        className={`${styles.deleteBtn} ml-2`}
        onClick={() => dispatch(deleteTodo(id))}
      />
    </div>
  )
}

export default TodosItem
