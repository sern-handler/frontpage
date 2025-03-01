"use client"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
/**
 * v0 by Vercel.
 * @see https://v0.dev/t/igzEEdGqAvH
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuGroup, DropdownMenuItem } from "@/components/ui/dropdown-menu"
import { logout } from "@/lib/auth/actions"
import { useSession } from "@/lib/providers/SessionProvider"
import Link from "next/link"
import { useState } from "react"
import { useFormState } from "react-dom"
import MobileNavbarLinks from "../MobileNavbarLinks/MobileNavbarLinks"
import { ThemeSwitcher } from "../ThemeSwitcher/ThemeSwitcher"

export const links = [
  { href: 'https://sern.dev', name: 'Back to sern.dev' },
  { href: '/dashboard', name: 'Dashboard' },
  { href: '/add', name: 'Submit' },
]

function NavbarLinks() {
  return (
    <>
      {links.map((link) => (
        <Link key={link.href} href={link.href}>
          <Button variant={'link'}>{link.name}</Button>
        </Link>
      ))}
    </>
  );
}

export default function Navbar() {
  const { user, discord } = useSession();
  const [, logoutAction] = useFormState(logout, null)
  return (
    <>
      <nav className="flex items-center h-16 px-4 border-b gap-3 shrink-0">
        <Link href="/" className="hidden md:flex">
          <Button>sern Frontpage</Button>
        </Link>
        <MobileNavbarLinks />
        <div className="hidden md:flex">
          <NavbarLinks />
        </div>
        <div className="flex-1" />
        <ThemeSwitcher />
        {user ? (
          <>
            <DropdownMenu>
              <DropdownMenuTrigger asChild className="cursor-pointer">
                <Avatar>
                  <AvatarImage src={`https://cdn.discordapp.com/avatars/${discord?.id}/${discord?.avatar}.webp`} alt={`@${user.username}`} />
                  <AvatarFallback>{user.username}</AvatarFallback>
                </Avatar>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                  {user.isAdmin && (
                    <Link href="/admin">
                      <DropdownMenuItem>
                        Admin panel
                      </DropdownMenuItem>
                    </Link>
                  )}
                  <DropdownMenuItem className="cursor-pointer" onClick={() => {
                    logoutAction()
                  }}>
                    Sign out
                  </DropdownMenuItem>
                  </DropdownMenuGroup>
              </DropdownMenuContent>
            </DropdownMenu>
          </>
        ) : (
          <Link href="/auth/login">
            <Button variant="outline">Sign in</Button>
          </Link>
        )}
      </nav>
    </>
  );
}
