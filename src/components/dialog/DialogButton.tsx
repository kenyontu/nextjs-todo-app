import classNames from 'classnames'

type Props = {
  children: React.ReactNode
  className?: string
  onClick?: VoidFunction
  isDisabled?: boolean
}

function DialogButton({
  children,
  className = '',
  onClick,
  isDisabled,
}: Props) {
  return (
    <button
      className={classNames(
        'text-accent font-semibold uppercase py-1 px-2 rounded outline-none border-0 focus:outline-none ring-accent focus-visible:ring-2 hover:ring-2',
        className,
        { 'grayscale opacity-70': isDisabled }
      )}
      onClick={() => {
        if (!isDisabled) {
          onClick()
        }
      }}
    >
      {children}
    </button>
  )
}

export default DialogButton
