'use client'

import { IKContext } from 'imagekitio-react' // ✅ use this instead
import { SessionProvider } from 'next-auth/react'

const urlEndpoint = process.env.NEXT_PUBLIC_ENDPOINT!
const publicKey = process.env.NEXT_PUBLIC_PUBLIC_KEY!

export default function Providers({ children }: { children: React.ReactNode }) {
  const authenticator = async () => {
    try {
      const response = await fetch('/api/imagekit-auth')

      if (!response.ok) {
        const errorText = await response.text()
        throw new Error(`Error fetching ImageKit auth parameters: ${errorText}`)
      }

      const data = await response.json()
      const { signature, expire, token } = data
      return { signature, expire, token }
    } catch (error) {
      console.error('Failed to fetch ImageKit auth parameters:', error)
    }
  }

  return (
    <SessionProvider>
      <IKContext
        publicKey={publicKey}
        urlEndpoint={urlEndpoint}
        authenticator={authenticator} // ✅ note correct spelling
      >
        {children}
      </IKContext>
    </SessionProvider>
  )
}
