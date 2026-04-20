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

  if (!profilo || loading) return <p style={{ padding: 16 }}>Caricamento...</p>

  return (
    <div style={{ padding: 16, fontFamily: 'system-ui, sans-serif' }}>
      <Calendario
        turni={turni}
        ospedali={profilo.ospedali}
        onGiornoClick={setGiornoSelezionato}
      />

      {/* Totale anno */}
      <div style={{ textAlign: 'center', marginTop: 24, paddingTop: 20, borderTop: '1px solid #eee' }}>
        <div style={{ fontSize: 13, color: '#888', marginBottom: 4 }}>Totale {anno}</div>
        <div style={{ fontSize: 36, fontWeight: 'bold', color: '#222' }}>
          {euro(totaleAnno)} €
        </div>
        <div style={{ fontSize: 13, color: '#888', marginTop: 4 }}>
          Residuo {euro(profilo.massimale - totaleAnno)} €
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