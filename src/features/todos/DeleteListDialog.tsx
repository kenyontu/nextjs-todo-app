import { Props as ModalProps } from 'react-modal'

import ConfirmationDialog from '../../components/dialog/ConfirmationDialog'
import { useAppDispatch, useAppSelector } from '../../app/hooks'
import { selectList, deleteList } from './todosSlice'

type Props = {
  isOpen: boolean
  listId: string
  onClose: VoidFunction
} & ModalProps

function DeleteListDialog({ isOpen, listId, onClose, ...props }: Props) {
  const dispatch = useAppDispatch()
  const list = useAppSelector(selectList(listId))

  return (
    <ConfirmationDialog
      isOpen={isOpen}
      title="Delete list"
      message={`Are you sure you want to delete the list "${list.name}"?`}
      onYes={() => {
        dispatch(deleteList(listId))
        onClose()
      }}
      onNo={onClose}
      {...props}
    />
  )
}

export default DeleteListDialog
