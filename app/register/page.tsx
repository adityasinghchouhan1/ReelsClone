'use client'

import { useRouter } from 'next/navigation'
import { useState } from 'react'

const Register = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmpassword, setconfirmpassword] = useState('')
  const [error, setError] = useState('')

  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (password === confirmpassword) {
      setError('Your password does not match')
    }
    try {
      const res = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      })
      const data = await res.json()
      if (!res.ok) {
        setError('registration failed')
      }
      router.push('/login')
    } catch (error) {}
  }
  return <form onSubmit={handleSubmit}></form>
}

export default Register
