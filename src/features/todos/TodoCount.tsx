import { useAppSelector } from '../../app/hooks'
import { selectTodoCount } from './todosSlice'

type Props = {
  listId: string
}

function TodoCount({ listId }: Props) {
  const count = useAppSelector(selectTodoCount(listId))

  return <span>{count !== 0 ? count : ''}</span>
}

export default TodoCount
