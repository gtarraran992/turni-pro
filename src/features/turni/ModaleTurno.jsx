import { useState } from 'react'
import { euro } from '../../utils/euro'

const MESI = ['Gennaio','Febbraio','Marzo','Aprile','Maggio','Giugno',
              'Luglio','Agosto','Settembre','Ottobre','Novembre','Dicembre']

export function ModaleTurno({ giorno, mese, anno, turnoEsistente, ospedali, onSalva, onElimina, onChiudi }) {
  const [ore, setOre] = useState(turnoEsistente?.ore?.toString() || '')
  const [ospedaleIndex, setOspedaleIndex] = useState(
    turnoEsistente ? ospedali.findIndex(o => o.nome === turnoEsistente.ospedale) : 0
  )
  const [salvando, setSalvando] = useState(false)
  const [eliminando, setEliminando] = useState(false)

  const ospedale = ospedali[ospedaleIndex]
  const totale = ore && Number(ore) > 0 ? Number(ore) * ospedale.tariffaOraria : 0

  const handleSalva = async () => {
    if (!ore || Number(ore) <= 0) return
    setSalvando(true)
    const data = new Date(anno, mese - 1, giorno)
    await onSalva({
      data,
      mese,
      anno,
      ore: Number(ore),
      ospedale: ospedale.nome,
      tariffaOraria: ospedale.tariffaOraria,
      totale
    })
    setSalvando(false)
    onChiudi()
  }

  const handleElimina = async () => {
    setEliminando(true)
    await onElimina(turnoEsistente.id)
    setEliminando(false)
    onChiudi()
  }

  return (
    <>
      {/* Overlay */}
      <div
        onClick={onChiudi}
        style={{
          position: 'fixed', inset: 0,
          background: 'rgba(0,0,0,0.4)',
          zIndex: 100
        }}
      />

      {/* Modale */}
      <div style={{
        position: 'fixed',
        bottom: 0, left: 0, right: 0,
        background: 'white',
        borderRadius: '16px 16px 0 0',
        padding: 24,
        zIndex: 101,
        maxWidth: 480,
        margin: '0 auto'
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
          <h3 style={{ margin: 0 }}>
            {giorno} {MESI[mese - 1]} {anno}
          </h3>
          <button onClick={onChiudi} style={{ background: 'none', border: 'none', fontSize: 20, cursor: 'pointer' }}>
            ×
          </button>
        </div>

        <div style={{ marginBottom: 12 }}>
          <label>Ospedale</label>
          <select
            value={ospedaleIndex}
            onChange={e => setOspedaleIndex(Number(e.target.value))}
            disabled={!!turnoEsistente}
            style={{ display: 'block', width: '100%', padding: 8, marginTop: 4 }}
          >
            {ospedali.map((osp, i) => (
              <option key={i} value={i}>{osp.nome} — {osp.tariffaOraria}€/h</option>
            ))}
          </select>
        </div>

        <div style={{ marginBottom: 12 }}>
          <label>Ore lavorate</label>
          <input
            type="number"
            value={ore}
            onChange={e => setOre(e.target.value)}
            min="1" max="24"
            style={{ display: 'block', width: '100%', padding: 8, marginTop: 4 }}
          />
        </div>

        {totale > 0 && (
          <div style={{ marginBottom: 16, padding: 8, background: '#f5f5f5', borderRadius: 4 }}>
            <strong>Totale: {euro(totale)}€</strong>
          </div>
        )}

        {!turnoEsistente && (
          <button
            onClick={handleSalva}
            disabled={salvando || !ore || Number(ore) <= 0}
            style={{ width: '100%', padding: 10, marginBottom: 8 }}
          >
            {salvando ? 'Salvataggio...' : 'Aggiungi turno'}
          </button>
        )}

        {turnoEsistente && (
          <button
            onClick={handleElimina}
            disabled={eliminando}
            style={{ width: '100%', padding: 10, background: '#fff0f0', color: 'red', border: '1px solid #ffcccc', borderRadius: 4, cursor: 'pointer' }}
          >
            {eliminando ? 'Eliminazione...' : 'Elimina turno'}
          </button>
        )}
      </div>
    </>
  )
}