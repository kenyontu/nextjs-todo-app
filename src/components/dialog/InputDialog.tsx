import { useState, useEffect } from 'react'
import { Props as ModalProps } from 'react-modal'

import BaseDialog from './BaseDialog'
import DialogButton from './DialogButton'

type Props = {
  isOpen: boolean
  title: string
  inputLabel: string
  inputPlaceholder?: string
  inputValue: string
  onDone: (value: string) => void
  onCancel: VoidFunction
  onValidateValue?: (value: string) => boolean
} & ModalProps

/**
 * Dialog that takes a single input from the user and returns it in the
 * onDone callback
 */
function InputDialog({
  isOpen,
  title,
  inputLabel,
  inputPlaceholder = '',
  inputValue,
  onDone,
  onCancel,
  onValidateValue = () => true,
  ...props
}: Props) {
  const [value, setValue] = useState(inputValue)

  useEffect(() => {
    setValue(inputValue)
  }, [isOpen])

  const isInputValid = onValidateValue(value)

  const submit = () => {
    if (isInputValid) onDone(value)
  }

  return (
    <BaseDialog
      isOpen={isOpen}
      title={title}
      onClose={onCancel}
      buttons={[
        <DialogButton key="cancel" onClick={onCancel}>
          Cancel
        </DialogButton>,
        <DialogButton key="done" onClick={submit} isDisabled={!isInputValid}>
          Done
        </DialogButton>,
      ]}
      {...props}
    >
      <div className="flex flex-col p-2">
        <input
          autoFocus
          aria-label={inputLabel}
          className="border-b-2 border-gray-500 p-1 outline-none focus:border-accent"
          type="text"
          placeholder={inputPlaceholder}
          value={value}
          onChange={(event) => setValue(event.target.value)}
          onKeyUp={(event) => {
            if (event.key === 'Enter') {
              submit()
            }
          }}
        />
      </div>
    </BaseDialog>
  )
}

export default InputDialog
