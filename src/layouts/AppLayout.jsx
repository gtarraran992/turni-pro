import { useState } from 'react'
import { Dashboard } from '../pages/Dashboard'
import { Impostazioni } from '../features/impostazioni/Impostazioni'
import { useAuth } from '../hooks/useAuth'

export function AppLayout() {
  const [pagina, setPagina] = useState('dashboard')
  const { user } = useAuth()

  return (
    <div style={{ maxWidth: 480, margin: '0 auto', paddingBottom: 64 }}>
      {pagina === 'dashboard' && <Dashboard />}
      {pagina === 'impostazioni' && (
        <Impostazioni
          userId={user.uid}
          onSalvato={() => setPagina('dashboard')}
        />
      )}

      {/* Barra navigazione */}
      <div style={{
        position: 'fixed',
        bottom: 0, left: 0, right: 0,
        background: 'white',
        borderTop: '1px solid #eee',
        display: 'flex',
        zIndex: 50,
        maxWidth: 480,
        margin: '0 auto'
      }}>
        <NavBtn
          label="Turni"
          icon="📅"
          attivo={pagina === 'dashboard'}
          onClick={() => setPagina('dashboard')}
        />
        <NavBtn
          label="Impostazioni"
          icon="⚙️"
          attivo={pagina === 'impostazioni'}
          onClick={() => setPagina('impostazioni')}
        />
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
        padding: '10px 0',
        background: 'none',
        border: 'none',
        cursor: 'pointer',
        color: attivo ? '#4A90D9' : '#888',
        fontSize: 12,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 2
      }}
    >
      <span style={{ fontSize: 20 }}>{icon}</span>
      {label}
    </button>
  )
}