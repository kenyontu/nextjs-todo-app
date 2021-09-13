import { useAppSelector } from '../../app/hooks'
import { selectListIds } from './todosSlice'
import ListsItem from './ListsItem'
import Button from '../../components/Button'

type Props = {
  className?: string
  onSelectedListChange: VoidFunction
  onAddListClick: VoidFunction
}

function Lists({
  onSelectedListChange,
  className = '',
  onAddListClick,
}: Props) {
  const ids = useAppSelector(selectListIds())

  return (
    <div
      className={`flex flex-col h-full overflow-hidden bg-sidebar ${className}`}
    >
      <div className="px-5 py-3 flex justify-between items-center text-gray-400 border-b border-gray-500">
        <span className="text-2xl">Lists</span>
        <Button
          data-testid="add-list-btn"
          aria-label="Add list"
          onClick={onAddListClick}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-8 h-8 p-2 fill-current text-gray-400"
          >
            <path d="M8 0a1 1 0 0 1 1 1v6h6a1 1 0 1 1 0 2H9v6a1 1 0 1 1-2 0V9H1a1 1 0 0 1 0-2h6V1a1 1 0 0 1 1-1z" />
          </svg>
        </Button>
      </div>
      <div
        role="list"
        className="flex flex-col justify-items-stretch overflow-y-auto py-5 px-5"
      >
        {ids.map((id) => (
          <ListsItem
            key={id}
            id={id}
            onSelectedListChange={onSelectedListChange}
          />
        ))}
      </div>
    </div>
  )
}

export default Lists
