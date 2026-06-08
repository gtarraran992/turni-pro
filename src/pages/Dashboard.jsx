import { useState } from 'react'
import { useAuth } from '../hooks/useAuth'
import { useTurni } from '../features/turni/useTurni'
import { useImpostazioni } from '../features/impostazioni/useImpostazioni'
import { Calendario } from '../features/turni/Calendario'
import { ModaleTurno } from '../features/turni/ModaleTurno'
import { euro } from '../utils/euro'

export function Dashboard() {
  const { user } = useAuth()
  const anno = new Date().getFullYear()
  const { profilo } = useImpostazioni(user?.uid)
  const { turni, loading, aggiungi, elimina } = useTurni(user?.uid, anno)
  const [giornoSelezionato, setGiornoSelezionato] = useState(null)

  const totaleAnno = turni.reduce((acc, t) => acc + (t.totale || 0), 0)
  const residuo = (profilo?.massimale || 0) - totaleAnno
  const percentuale = profilo?.massimale ? Math.min((totaleAnno / profilo.massimale) * 100, 100) : 0

  if (!profilo || loading) return <p style={{ padding: 16 }}>Caricamento...</p>

  return (
    <div style={{ padding: 16, fontFamily: 'system-ui, sans-serif' }}>
      <Calendario
        turni={turni}
        ospedali={profilo.ospedali}
        onGiornoClick={setGiornoSelezionato}
      />

      <div style={{
        marginTop: 20,
        padding: '16px 20px',
        background: '#f8fafc',
        border: '1px solid #e6e8eb',
        borderRadius: 14,
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
      }}>
        <div>
          <div style={{ fontSize: 12, color: '#888', marginBottom: 4 }}>Totale {anno}</div>
          <div style={{ fontSize: 28, fontWeight: '700', color: '#1a1a1a', lineHeight: 1 }}>
            {euro(totaleAnno)} €
          </div>
        </div>
        <div style={{ textAlign: 'right' }}>
          <div style={{ fontSize: 12, color: '#888', marginBottom: 4 }}>Residuo</div>
          <div style={{ fontSize: 16, fontWeight: '600', color: '#1a1a1a', marginBottom: 8 }}>
            {euro(residuo)} €
          </div>
          <div style={{ width: 80, height: 4, background: '#e6e8eb', borderRadius: 2 }}>
            <div style={{
              height: 4,
              width: `${percentuale}%`,
              background: percentuale > 85 ? '#ef4444' : '#1A4C96',
              borderRadius: 2,
              transition: 'width 0.3s ease'
            }} />
          </div>
        </div>
      </div>

      {giornoSelezionato && (
        <ModaleTurno
          {...giornoSelezionato}
          ospedali={profilo.ospedali}
          onSalva={aggiungi}
          onElimina={elimina}
          onChiudi={() => setGiornoSelezionato(null)}
        />
      )}
    </div>
  )
}