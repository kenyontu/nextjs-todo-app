import { useAppSelector } from '../../app/hooks'
import { selectTodoIds } from './todosSlice'
import TodoListItem from './TodosItem'
import AddTodo from './AddTodo'

type Props = {
  className?: string
}

function Todos({ className = '' }: Props) {
  const ids = useAppSelector(selectTodoIds())

  return (
    <div
      className={`flex flex-col overflow-y-hidden w-full md:max-w-3xl md:mr-auto md:ml-auto xl:w-3/4 ${className}`}
    >
      <AddTodo className="order-3 md:order-1" />
      <div
        role="list"
        className="flex flex-col flex-grow order-2 md:order-3 min-h-0 overflow-y-auto w-full p-3"
      >
        {ids.map((id: string) => (
          <TodoListItem key={id} id={id} />
        ))}
      </div>
      {ids.length === 0 && (
        <span className="order-1 md:order-2 m-auto mt-7 text-gray-500">
          You do not have todos in this list
        </span>
      )}
    </div>
  )
}

export default Todos
