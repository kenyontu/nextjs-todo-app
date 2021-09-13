type Props = {
  title: string
  left?: React.ReactNode
  right?: React.ReactNode
}

function AppBar({ title, left, right }: Props) {
  return (
    <div className="bg-mobile-appbar md:bg-transparent text-primary shadow md:shadow-none md:font-bold xl:mt-5 md:mb-2 z-appbar">
      <div className="flex items-center w-full p-3 xl:w-3/4 md:max-w-3xl md:mx-auto">
        {left}
        <h1 className="flex-1 text-2xl font-semibold md:text-4xl whitespace-nowrap overflow-hidden overflow-ellipsis">
          {title}
        </h1>
        {right}
      </div>
    </div>
  )
}

export default AppBar
