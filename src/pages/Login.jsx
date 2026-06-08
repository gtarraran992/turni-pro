import { useState } from 'react'
import { useAuth } from '../hooks/useAuth'
import { sendPasswordResetEmail } from 'firebase/auth'
import { auth } from '../services/firebase'

export function Login() {
  const { login, loginGoogle } = useAuth()
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

  const handleGoogle = async () => {
    setErrore('')
    try {
      await loginGoogle()
    } catch {
      setErrore('Accesso con Google non riuscito')
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
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: '#f8fafc',
      padding: '0 16px'
    }}>
      <div style={{ width: '100%', maxWidth: 360 }}>

        {/* Logo e titolo */}
       <div style={{ textAlign: 'center', marginBottom: 32 }}>
  <img
    src="/icon-1024.png"
    alt="Turni Pro"
    style={{ width: 80, height: 80, borderRadius: 20, marginBottom: 16 }}
  />
  <h1 style={{ fontSize: 26, fontWeight: '700', color: '#0D3B7A', margin: '0 0 4px' }}>
    Turni Pro
  </h1>
  <p style={{ fontSize: 13, color: '#888', margin: 0 }}>
    Monitoraggio turni e compensi
  </p>
</div>

        {/* Card */}
        <div style={{
          background: 'white',
          borderRadius: 20,
          padding: 24,
          boxShadow: '0 2px 16px rgba(0,0,0,0.06)',
          border: '1px solid #e6e8eb'
        }}>

          {/* Bottone Google */}
          <button
            onClick={handleGoogle}
            style={{
              width: '100%', padding: '11px 16px',
              background: 'white',
              border: '1.5px solid #e6e8eb',
              borderRadius: 12, cursor: 'pointer',
              fontSize: 14, fontWeight: '500',
              color: '#333',
              display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10,
              marginBottom: 16
            }}
          >
            <svg viewBox="0 0 24 24" width="18" height="18">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z"/>
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
            </svg>
            Continua con Google
          </button>

          {/* Divisore */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16 }}>
            <div style={{ flex: 1, height: 1, background: '#e6e8eb' }} />
            <span style={{ fontSize: 12, color: '#aaa' }}>oppure</span>
            <div style={{ flex: 1, height: 1, background: '#e6e8eb' }} />
          </div>

          {/* Form email/password */}
          <form onSubmit={handleSubmit}>
            <div style={{ marginBottom: 10 }}>
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                style={{
                  width: '100%', padding: '11px 14px',
                  borderRadius: 10, border: '1.5px solid #e6e8eb',
                  fontSize: 14, color: '#1a1a1a',
                  outline: 'none', boxSizing: 'border-box'
                }}
              />
            </div>
            <div style={{ marginBottom: 16 }}>
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                style={{
                  width: '100%', padding: '11px 14px',
                  borderRadius: 10, border: '1.5px solid #e6e8eb',
                  fontSize: 14, color: '#1a1a1a',
                  outline: 'none', boxSizing: 'border-box'
                }}
              />
            </div>

            {errore && (
              <div style={{ marginBottom: 12, padding: '8px 12px', background: '#fff0f0', border: '1px solid #fecaca', borderRadius: 8, fontSize: 13, color: '#ef4444' }}>
                {errore}
              </div>
            )}

            {resetInviato && (
              <div style={{ marginBottom: 12, padding: '8px 12px', background: '#f0fdf4', border: '1px solid #bbf7d0', borderRadius: 8, fontSize: 13, color: '#16a34a' }}>
                Email di reset inviata, controlla la casella di posta
              </div>
            )}

            <button
              type="submit"
              style={{
                width: '100%', padding: '12px',
                background: '#0D3B7A', color: 'white',
                border: 'none', borderRadius: 12,
                cursor: 'pointer', fontSize: 15, fontWeight: '600'
              }}
            >
              Accedi
            </button>
          </form>

          <div style={{ textAlign: 'center', marginTop: 14 }}>
            <button
              onClick={handleReset}
              style={{ background: 'none', border: 'none', color: '#1A4C96', cursor: 'pointer', fontSize: 13 }}
            >
              Password dimenticata?
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}