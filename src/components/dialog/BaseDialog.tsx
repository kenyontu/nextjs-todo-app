import Modal, { Props as ModalProps } from 'react-modal'

type Props = {
  isOpen?: boolean
  children: React.ReactNode
  title: string
  buttons: React.ReactNode[]
  onClose: VoidFunction
} & ModalProps

function DialogBase({
  isOpen = false,
  children,
  title,
  buttons,
  onClose,
  ...props
}: Props) {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      className="relative w-2/3 md:w-96 top-10 mx-auto shadow-dialog bg-white rounded"
      overlayClassName="z-dialog bg-opacity-60 bg-black fixed top-0 right-0 bottom-0 left-0"
      closeTimeoutMS={100}
      {...props}
    >
      <h1 className="text-accent text-2xl border-b p-2 border-gray-200">
        {title}
      </h1>
      {children}
      {buttons.length > 0 && (
        <div className="border-t border-gray-200  flex p-2 justify-end space-x-2">
          {buttons}
        </div>
      )}
    </Modal>
  )
}

export default DialogBase
