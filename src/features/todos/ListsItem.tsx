import classNames from 'classnames'

import { useAppDispatch, useAppSelector } from '../../app/hooks'
import { selectList, selectSelectedList, setSelectedList } from './todosSlice'
import TodoCount from './TodoCount'

type Props = {
  id: string
  onSelectedListChange: VoidFunction
}

function ListsItem({ id, onSelectedListChange }: Props) {
  const dispatch = useAppDispatch()
  const list = useAppSelector(selectList(id))
  const selectedList = useAppSelector(selectSelectedList())

  return (
    <button
      role="listitem"
      className={classNames(
        'flex items-center mb-2 last:mb-0 focus:outline-none active:outline-none cursor-pointer p-3 py-2 text-lg text-white border-0 outline-none ring-accent focus-visible:ring-2 hover:ring-2 rounded text-left',
        {
          'bg-list-item-active bg-opacity-60': id === selectedList.id,
        }
      )}
      onClick={() => {
        dispatch(setSelectedList(list.id))
        onSelectedListChange()
      }}
    >
      <span className="flex-1 whitespace-nowrap overflow-hidden overflow-ellipsis">
        {list.name}
      </span>
      <TodoCount listId={list.id} />
    </button>
  )
}

export default ListsItem
