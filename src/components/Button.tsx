type Props = {
  onClick: VoidFunction
  'data-testid'?: string
  className?: string
  children: React.ReactNode
} & Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'onClick'>

function Button({ children, className = '', onClick, ...rest }: Props) {
  return (
    <button
      className={`inline-block m-0 p-0 bg-transparent rounded outline-none focus:outline-none active:outline-none ring-accent focus-visible:ring-2 hover:ring-2 ${className}`}
      {...rest}
      onClick={onClick}
    >
      {children}
    </button>
  )
}

export default Button
