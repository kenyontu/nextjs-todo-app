import { Props as ModalProps } from 'react-modal'

import InputDialog from '../../components/dialog/InputDialog'
import { useAppDispatch } from '../../app/hooks'
import { addList } from './todosSlice'

type Props = {
  isOpen: boolean
  onClose: (isCreationSuccessful: boolean) => void
} & ModalProps

const AddListDialog = ({ isOpen, onClose, ...props }: Props) => {
  const dispatch = useAppDispatch()

  return (
    <InputDialog
      id="add-list"
      isOpen={isOpen}
      title="Add List"
      onCancel={() => onClose(false)}
      onDone={(name) => {
        dispatch(addList({ name, todos: [] }))
        onClose(true)
      }}
      inputLabel="Name"
      inputPlaceholder="Enter name"
      inputValue=""
      onValidateValue={(value) => value.length > 0}
      {...props}
    />
  )
}

export default AddListDialog
