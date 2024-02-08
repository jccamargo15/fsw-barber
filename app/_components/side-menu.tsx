'use client'

import { signIn, signOut, useSession } from 'next-auth/react'
import Link from 'next/link'
import {
  CalendarIcon,
  HomeIcon,
  LogInIcon,
  LogOutIcon,
  UserIcon,
} from 'lucide-react'

import { Avatar, AvatarImage } from './ui/avatar'
import { Button } from './ui/button'
import { SheetHeader, SheetTitle } from './ui/sheet'

const SideMenu = () => {
  const { data, status } = useSession()

  const handleLogin = () => signIn('google')

  const handleLogout = () => signOut()
  return (
    <>
      <SheetHeader className="text-left border-b border-solid border-secondary p-5">
        <SheetTitle>Menu</SheetTitle>
      </SheetHeader>

      {status === 'authenticated' ? (
        <div className="flex justify-between px-5 py-6 items-center">
          <div className="flex items-center gap-3">
            <Avatar>
              <AvatarImage src={data.user?.image ?? ''} />
            </Avatar>

            <h2 className="font-bold">{data.user?.name}</h2>
          </div>

          <Button variant="secondary" size="icon" onClick={handleLogout}>
            <LogOutIcon />
          </Button>
        </div>
      ) : (
        <div className="flex flex-col px-5 py-6 gap-3">
          <div className="flex items-center gap-2">
            <UserIcon size={28} />
            <h2 className="font-bold">Olá, faça seu login!</h2>
          </div>
          <Button
            variant="secondary"
            className="w-full justify-start"
            onClick={handleLogin}
          >
            <LogInIcon className="mr-2" size={18} />
            Fazer login
          </Button>
        </div>
      )}

      <div className="flex flex-col gap-3 px-5">
        <Button variant="outline" className="justify-start" asChild>
          <Link href="/">
            <HomeIcon className="mr-2" size={18} />
            Início
          </Link>
        </Button>

        {status === 'authenticated' && (
          <Button variant="outline" className="justify-start" asChild>
            <Link href="/bookings">
              <CalendarIcon className="mr-2" size={18} />
              Agendamentos
            </Link>
          </Button>
        )}
      </div>
    </>
  )
}

export default SideMenu
