import { Props as ModalProps } from 'react-modal'

import InputDialog from '../../components/dialog/InputDialog'
import { useAppDispatch, useAppSelector } from '../../app/hooks'
import { selectList, editList } from './todosSlice'

type Props = {
  isOpen: boolean
  listId: string
  onClose: VoidFunction
} & ModalProps

function RenameListDialog({ isOpen, listId, onClose, ...props }: Props) {
  const list = useAppSelector(selectList(listId))
  const dispatch = useAppDispatch()

  return (
    <InputDialog
      id="rename-list"
      isOpen={isOpen}
      title="Rename list"
      inputLabel="New list name"
      inputPlaceholder="Enter name"
      inputValue={list.name}
      onDone={(name) => {
        dispatch(editList({ id: listId, list: { ...list, name } }))
        onClose()
      }}
      onCancel={onClose}
      onValidateValue={(value) => value.length > 0}
      {...props}
    />
  )
}

export default RenameListDialog
