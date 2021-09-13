import { useState } from 'react'

import { useAppDispatch } from '../../app/hooks'
import { addTodo } from './todosSlice'

type Props = {
  className?: string
} & Omit<React.HTMLProps<HTMLDivElement>, 'className' | 'children'>

function AddTodoItem({ className = '', ...props }: Props) {
  const [text, setText] = useState('')
  const dispatch = useAppDispatch()

  return (
    <div
      {...props}
      className={`flex items-center pl-3 py-2 md:mx-2 bg-sidebar md:bg-transparent md:border-b-2 md:border-gray-600 md:focus-within:border-list-item-active ${className}`}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 16 16"
        className="w-8 h-8 p-2 mr-1 fill-current text-gray-400 md:text-gray-600"
      >
        <path d="M8 0a1 1 0 0 1 1 1v6h6a1 1 0 1 1 0 2H9v6a1 1 0 1 1-2 0V9H1a1 1 0 0 1 0-2h6V1a1 1 0 0 1 1-1z" />
      </svg>

      <input
        type="text"
        role="textbox"
        className="flex-1 text-white md:text-dark placeholder-gray-400 bg-transparent outline-none p-2 rounded-md"
        placeholder="Add a todo here"
        value={text}
        onChange={(event) => setText(event.target.value)}
        onKeyUp={(event) => {
          if (event.key === 'Enter') {
            dispatch(addTodo({ isDone: false, text }))
            setText('')
          }
        }}
      />
    </div>
  )
}

export default AddTodoItem
