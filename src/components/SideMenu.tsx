import classNames from 'classnames'

interface Props {
  isOpen?: boolean
  children: React.ReactNode
  className?: string
  onClose: () => void
}

function SideMenu({
  isOpen = false,
  children,
  className = '',
  onClose,
}: Props) {
  return (
    <div className={className}>
      <div
        data-testid="backdrop"
        className={classNames(
          'fixed top-0 right-0 bottom-0 left-0 opacity-0 transition-opacity bg-black bg-opacity-70 pointer-events-none delay-75 z-side-menu md:hidden',
          { 'opacity-100 pointer-events-auto delay-0': isOpen }
        )}
        onClick={onClose}
      ></div>
      <div
        data-testid="content-container"
        className={classNames(
          'fixed top-0 bottom-0 left-0 w-3/4 pointer-events-none -translate-x-full transition-transform delay-100 duration-100 z-side-menu md:static md:h-full md:w-full md:pointer-events-auto md:translate-x-0 md:duration-0 md:delay-0 md:shadow-side-menu',
          {
            ['pointer-events-auto translate-x-0 delay-0']: isOpen,
          }
        )}
      >
        {children}
      </div>
    </div>
  )
}

export default SideMenu
