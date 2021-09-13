import { Props as ModalProps } from 'react-modal'

import BaseDialog from './BaseDialog'
import DialogButton from './DialogButton'

type Props = {
  isOpen: boolean
  title: string
  message: string
  onYes: VoidFunction
  onNo: VoidFunction
} & ModalProps

function ConfirmationDialog({
  isOpen,
  title,
  message,
  onYes,
  onNo,
  ...props
}: Props) {
  return (
    <BaseDialog
      isOpen={isOpen}
      title={title}
      onClose={onNo}
      buttons={[
        <DialogButton key="no" onClick={onNo}>
          No
        </DialogButton>,
        <DialogButton key="yes" onClick={onYes}>
          Yes
        </DialogButton>,
      ]}
      {...props}
    >
      <div className="flex flex-col p-2">
        <p className="p-1">{message}</p>
      </div>
    </BaseDialog>
  )
}

export default ConfirmationDialog
