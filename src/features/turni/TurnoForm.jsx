import { useState } from 'react'

export function TurnoForm({ ospedali, onAggiungi }) {
  const oggi = new Date().toISOString().split('T')[0]

  const [data, setData] = useState(oggi)
  const [ore, setOre] = useState('')
  const [ospedaleIndex, setOspedaleIndex] = useState(0)
  const [errore, setErrore] = useState('')
  const [salvando, setSalvando] = useState(false)

  const handleSalva = async () => {
    setErrore('')

    if (!data) {
      setErrore('Inserisci la data')
      return
    }
    if (!ore || Number(ore) <= 0) {
      setErrore('Inserisci le ore lavorate')
      return
    }

    const ospedale = ospedali[ospedaleIndex]
    const dataObj = new Date(data)
    const totale = Number(ore) * ospedale.tariffaOraria

    setSalvando(true)
    await onAggiungi({
      data: dataObj,
      mese: dataObj.getMonth() + 1,
      ore: Number(ore),
      ospedale: ospedale.nome,
      tariffaOraria: ospedale.tariffaOraria,
      totale
    })
    setSalvando(false)

    // reset form
    setData(oggi)
    setOre('')
    setOspedaleIndex(0)
  }

  return (
    <div style={{ padding: 16, border: '1px solid #ddd', borderRadius: 8, marginBottom: 16 }}>
      <h3 style={{ marginTop: 0 }}>Aggiungi turno</h3>

      <div style={{ marginBottom: 12 }}>
        <label>Data</label>
        <input
          type="date"
          value={data}
          onChange={e => setData(e.target.value)}
          style={{ display: 'block', width: '100%', padding: 8, marginTop: 4 }}
        />
      </div>

      <div style={{ marginBottom: 12 }}>
        <label>Ospedale</label>
        <select
          value={ospedaleIndex}
          onChange={e => setOspedaleIndex(Number(e.target.value))}
          style={{ display: 'block', width: '100%', padding: 8, marginTop: 4 }}
        >
          {ospedali.map((osp, i) => (
            <option key={i} value={i}>
              {osp.nome} — {osp.tariffaOraria}€/h
            </option>
          ))}
        </select>
      </div>

      <div style={{ marginBottom: 12 }}>
        <label>Ore lavorate</label>
        <input
          type="number"
          value={ore}
          onChange={e => setOre(e.target.value)}
          min="1"
          max="24"
          style={{ display: 'block', width: '100%', padding: 8, marginTop: 4 }}
        />
      </div>

      <div style={{ marginBottom: 12, padding: 8, background: '#f5f5f5', borderRadius: 4 }}>
        <strong>Totale: </strong>
        {ore && Number(ore) > 0
          ? `${(Number(ore) * ospedali[ospedaleIndex].tariffaOraria).toFixed(2)}€`
          : '—'
        }
      </div>

      {errore && <p style={{ color: 'red' }}>{errore}</p>}

      <button
        onClick={handleSalva}
        disabled={salvando}
        style={{ width: '100%', padding: 10 }}
      >
        {salvando ? 'Salvataggio...' : 'Aggiungi turno'}
      </button>
    </div>
  )
}