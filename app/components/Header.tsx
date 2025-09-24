'use client'

import { signOut, useSession } from 'next-auth/react'
import Link from 'next/link'

const Header = () => {
  const { data: session } = useSession()

  const handleSignOut = async () => {
    try {
      await signOut()
    } catch (error) {
      console.error('Error signing out:', error)
    }
  }
  return (
    <div>
      <button onClick={handleSignOut}>Singout</button>
      <Link href={'/login'}>login</Link>
      <Link href={'/register'}>register</Link>

      {session && <div>Welcome, {session.user?.name}</div>}
    </div>
  )
}

export default Header
