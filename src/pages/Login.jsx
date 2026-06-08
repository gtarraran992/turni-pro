import { useState } from 'react'
import { useAuth } from '../hooks/useAuth'
import { sendPasswordResetEmail } from 'firebase/auth'
import { auth } from '../services/firebase'

export function Login() {
  const { login } = useAuth()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [errore, setErrore] = useState('')
  const [resetInviato, setResetInviato] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setErrore('')
    try {
      await login(email, password)
    } catch {
      setErrore('Email o password non validi')
    }
  }

  const handleReset = async () => {
    if (!email) {
      setErrore('Inserisci la tua email per ricevere il link di reset')
      return
    }
    try {
      await sendPasswordResetEmail(auth, email)
      setResetInviato(true)
      setErrore('')
    } catch {
      setErrore('Email non trovata')
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
        {resetInviato && <p style={{ color: 'green' }}>Email di reset inviata, controlla la casella di posta</p>}
        <button type="submit" style={{ width: '100%', padding: 10 }}>
          Accedi
        </button>
      </form>
      <div style={{ textAlign: 'center', marginTop: 12 }}>
        <button
          onClick={handleReset}
          style={{ background: 'none', border: 'none', color: '#1A4C96', cursor: 'pointer', fontSize: 14 }}
        >
          Password dimenticata?
        </button>
      </div>
    </div>
  )
}