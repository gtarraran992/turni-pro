import { useState } from 'react'
import { euro } from '../../utils/euro'

const MESI = ['Gennaio','Febbraio','Marzo','Aprile','Maggio','Giugno',
              'Luglio','Agosto','Settembre','Ottobre','Novembre','Dicembre']

export function ModaleTurno({ giorno, mese, anno, turnoEsistente, ospedali, onSalva, onElimina, onChiudi }) {
  const [ore, setOre] = useState(turnoEsistente?.ore?.toString() || '')
  const [ospedaleIndex, setOspedaleIndex] = useState(
    turnoEsistente ? ospedali.findIndex(o => o.nome === turnoEsistente.ospedale) : 0
  )
  const [notturno, setNotturno] = useState(turnoEsistente?.notturno || false)
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
      totale,
      notturno
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
      <div onClick={onChiudi} style={{
        position: 'fixed', inset: 0,
        background: 'rgba(0,0,0,0.4)',
        zIndex: 100
      }} />

      <div style={{
        position: 'fixed',
        top: '50%', left: '50%',
        transform: 'translate(-50%, -50%)',
        background: 'white',
        borderRadius: 16,
        padding: 24,
        zIndex: 101,
        width: '65%',
        maxWidth: 300,
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
          <h3 style={{ margin: 0, fontSize: 16 }}>
            {giorno} {MESI[mese - 1]} {anno}
          </h3>
          <button onClick={onChiudi} style={{ background: 'none', border: 'none', fontSize: 20, cursor: 'pointer' }}>×</button>
        </div>

        {/* Ospedale */}
        <div style={{ marginBottom: 12, textAlign: 'center' }}>
          <label style={{ fontSize: 13, color: '#666' }}>Ospedale</label>
          <select
            value={ospedaleIndex}
            onChange={e => setOspedaleIndex(Number(e.target.value))}
            disabled={!!turnoEsistente}
            style={{ width: '100%', padding: 8, marginTop: 4, borderRadius: 8, border: '1px solid #e6e8eb' }}
          >
            {ospedali.map((osp, i) => (
              <option key={i} value={i}>{osp.nome}</option>
            ))}
          </select>
        </div>

        {/* Ore */}
        <div style={{ marginBottom: 12, textAlign: 'center' }}>
          <label style={{ fontSize: 13, color: '#666' }}>Ore lavorate</label>
          <input
            type="number"
            value={ore}
            onChange={e => setOre(e.target.value)}
            min="1" max="24"
            disabled={!!turnoEsistente}
            style={{ width: '100%', padding: 8, marginTop: 4, borderRadius: 8, border: '1px solid #e6e8eb' }}
          />
        </div>

        {/* Toggle notturno */}
        {!turnoEsistente && (
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16, padding: '10px 12px', background: '#f8fafc', borderRadius: 10 }}>
            <span style={{ fontSize: 13, color: '#333' }}>Turno notturno</span>
            <div
              onClick={() => setNotturno(n => !n)}
              style={{
                width: 44, height: 24,
                borderRadius: 12,
                background: notturno ? '#37C7AF' : '#e6e8eb',
                cursor: 'pointer',
                position: 'relative',
                transition: 'background 0.2s'
              }}
            >
              <div style={{
                position: 'absolute',
                top: 2, left: notturno ? 22 : 2,
                width: 20, height: 20,
                borderRadius: '50%',
                background: 'white',
                boxShadow: '0 1px 3px rgba(0,0,0,0.2)',
                transition: 'left 0.2s'
              }} />
            </div>
          </div>
        )}

        {turnoEsistente && turnoEsistente.notturno && (
          <div style={{ marginBottom: 12, padding: '6px 12px', background: '#f0fdf4', border: '1px solid #bbf7d0', borderRadius: 8, fontSize: 13, color: '#16a34a' }}>
            Turno notturno
          </div>
        )}

        {totale > 0 && (
          <div style={{ marginBottom: 16, padding: 8, background: '#f8fafc', borderRadius: 8, fontSize: 14 }}>
            <strong>Totale: {euro(totale)} €</strong>
          </div>
        )}

        {!turnoEsistente && (
          <button
            onClick={handleSalva}
            disabled={salvando || !ore || Number(ore) <= 0}
            style={{ width: '100%', padding: 10, borderRadius: 10, border: 'none', background: '#1A4C96', color: 'white', fontWeight: '600', cursor: 'pointer', fontSize: 14 }}
          >
            {salvando ? 'Salvataggio...' : 'Aggiungi turno'}
          </button>
        )}

        {turnoEsistente && (
          <button
            onClick={handleElimina}
            disabled={eliminando}
            style={{ width: '100%', padding: 10, borderRadius: 10, background: '#fff0f0', color: '#ef4444', border: '1px solid #fecaca', cursor: 'pointer', fontSize: 14 }}
          >
            {eliminando ? 'Eliminazione...' : 'Elimina turno'}
          </button>
        )}
      </div>
    </>
  )
}