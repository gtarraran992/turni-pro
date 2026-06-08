import { useState } from 'react'
import { Dashboard } from '../pages/Dashboard'
import { Impostazioni } from '../features/impostazioni/Impostazioni'
import { useAuth } from '../hooks/useAuth'
import { Legal } from '../pages/Legal'
import { Termini } from '../pages/Termini'

export function AppLayout() {
  const [pagina, setPagina] = useState('dashboard')
  const { user, logout } = useAuth()

  return (
    <div style={{ maxWidth: 480, margin: '0 auto', paddingBottom: 72 }}>
      {pagina === 'dashboard' && <Dashboard />}
{pagina === 'impostazioni' && (
  <Impostazioni
    userId={user.uid}
    user={user}
    onSalvato={() => setPagina('dashboard')}
    onNavigaLegal={() => setPagina('legal')}
    onNavigaTermini={() => setPagina('termini')}
    onLogout={logout}
  />
)}
      {pagina === 'legal' && <Legal onBack={() => setPagina('impostazioni')} />}
      {pagina === 'termini' && <Termini onBack={() => setPagina('impostazioni')} />}

      <div style={{
        position: 'fixed',
        bottom: 0, left: 0, right: 0,
        display: 'flex',
        justifyContent: 'center',
        padding: '8px 16px 12px',
        zIndex: 50,
      }}>
        <div style={{
          display: 'flex',
          background: 'white',
          border: '1px solid #e6e8eb',
          borderRadius: 20,
          padding: 6,
          gap: 4,
          width: '100%',
          maxWidth: 480,
          boxShadow: '0 2px 12px rgba(0,0,0,0.08)'
        }}>
          <NavBtn label="Turni" icon="📅" attivo={pagina === 'dashboard'} onClick={() => setPagina('dashboard')} />
          <NavBtn label="Impostazioni" icon="⚙️" attivo={pagina === 'impostazioni'} onClick={() => setPagina('impostazioni')} />
        </div>
      </div>
    </div>
  )
}

function NavBtn({ label, icon, attivo, onClick }) {
  return (
    <button
      onClick={onClick}
      style={{
        flex: 1,
        padding: '8px 0',
        background: attivo ? '#f0f7ff' : 'transparent',
        border: attivo ? '1px solid #bfdbfe' : '1px solid transparent',
        borderRadius: 14,
        cursor: 'pointer',
        color: attivo ? '#3b82f6' : '#888',
        fontSize: 12,
        fontWeight: attivo ? '600' : '400',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 3
      }}
    >
      <span style={{ fontSize: 20 }}>{icon}</span>
      {label}
    </button>
  )
}