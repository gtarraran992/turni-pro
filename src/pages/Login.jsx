import { useState } from 'react'
import { useAuth } from '../hooks/useAuth'

export function Login() {
  const { login } = useAuth()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [errore, setErrore] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    setErrore('')
    try {
      await login(email, password)
    } catch {
      setErrore('Email o password non validi')
    }
  }

  return (
    <div style={{ maxWidth: 360, margin: '80px auto', padding: '0 16px' }}>
      <h1>Turni Pro</h1>
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: 12 }}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            style={{ width: '100%', padding: 8 }}
          />
        </div>
        <div style={{ marginBottom: 12 }}>
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            style={{ width: '100%', padding: 8 }}
          />
        </div>
        {errore && <p style={{ color: 'red' }}>{errore}</p>}
        <button type="submit" style={{ width: '100%', padding: 10 }}>
          Accedi
        </button>
      </form>
    </div>
  )
}