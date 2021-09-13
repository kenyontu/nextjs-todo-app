import { useState } from 'react'
import Head from 'next/head'
import { Menu, MenuItem, MenuButton } from '@szhsin/react-menu'
import '@szhsin/react-menu/dist/index.css'
import '@szhsin/react-menu/dist/transitions/slide.css'

import { useAppSelector } from '../app/hooks'
import {
  selectSelectedList,
  DEFAULT_LIST_ID,
} from '../features/todos/todosSlice'
import AppBar from '../components/AppBar'
import Lists from '../features/todos/Lists'
import Todos from '../features/todos/Todos'
import AddListDialog from '../features/todos/AddListDialog'
import RenameListDialog from '../features/todos/RenameListDialog'
import ConfirmationDialog from '../features/todos/DeleteListDialog'
import SideMenu from '../components/SideMenu'
import Button from '../components/Button'

type PageAppBarProps = {
  onSideMenuIconClick?: VoidFunction
}

function PageAppBar({ onSideMenuIconClick }: PageAppBarProps) {
  const [isRenameDialogOpen, setIsRenameDialogOpen] = useState(false)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const selectedList = useAppSelector(selectSelectedList())

  return (
    <>
      <RenameListDialog
        listId={selectedList.id}
        isOpen={isRenameDialogOpen}
        onClose={() => setIsRenameDialogOpen(false)}
      />
      <ConfirmationDialog
        listId={selectedList.id}
        isOpen={isDeleteDialogOpen}
        onClose={() => setIsDeleteDialogOpen(false)}
      />
      <AppBar
        title={selectedList.name}
        left={
          <>
            <Button
              className="md:hidden mr-4 p-1"
              onClick={onSideMenuIconClick}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-9 h-9 fill-current p-1"
                viewBox="0 0 16 16"
              >
                <path d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5z" />
              </svg>
            </Button>
          </>
        }
        right={
          <Menu
            menuButton={
              <MenuButton className="outline-none focus:outline-none ring-accent focus-visible:ring-2 hover:ring-2 rounded">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 16 16"
                  className="w-9 h-9 p-2 fill-current"
                >
                  <path d="M9.5 13a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0z" />
                </svg>
              </MenuButton>
            }
            transition
          >
            <MenuItem onClick={() => setIsRenameDialogOpen(true)}>
              Rename
            </MenuItem>
            {selectedList.id !== DEFAULT_LIST_ID && (
              <MenuItem
                className="active:bg-accent"
                onClick={() => setIsDeleteDialogOpen(true)}
              >
                Delete
              </MenuItem>
            )}
          </Menu>
        }
      />
    </>
  )
}

export default function Home() {
  const [isSideMenuOpen, setIsSideMenuOpen] = useState(false)
  const [isAddListOpen, setIsAddListOpen] = useState(false)

  return (
    <div id="home" className="flex h-full w-full items-stretch">
      <Head>
        <title>Todos</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <AddListDialog
        isOpen={isAddListOpen}
        onClose={(isCreationSuccessful) => {
          setIsAddListOpen(false)
          // If a list was created, also close the side menu
          if (isCreationSuccessful) setIsSideMenuOpen(false)
        }}
      />

      <SideMenu
        className="md:block md:w-1/3 md:max-w-xs"
        isOpen={isSideMenuOpen}
        onClose={() => setIsSideMenuOpen(false)}
      >
        <Lists
          onSelectedListChange={() => {
            setIsSideMenuOpen(false)
          }}
          onAddListClick={() => setIsAddListOpen(true)}
        />
      </SideMenu>

      <div className="flex flex-col flex-1 md:w-2/3 md:px-3">
        <PageAppBar onSideMenuIconClick={() => setIsSideMenuOpen(true)} />
        <Todos className="h-full" />
      </div>
    </div>
  )
}
