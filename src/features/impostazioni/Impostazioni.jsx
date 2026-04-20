import { useState, useEffect } from 'react'
import { useImpostazioni } from './useImpostazioni'

const ospedaleVuoto = { nome: '', tariffaOraria: '' }

export function Impostazioni({ userId, onSalvato }) {
  const { profilo, loading, salvando, salva } = useImpostazioni(userId)
  const [ospedali, setOspedali] = useState([{ ...ospedaleVuoto }])
  const [massimale, setMassimale] = useState('')
  const [errore, setErrore] = useState('')

  useEffect(() => {
    if (profilo) {
      setOspedali(profilo.ospedali || [{ ...ospedaleVuoto }])
      setMassimale(profilo.massimale || '')
    }
  }, [profilo])

  const aggiungiOspedale = () => {
    if (ospedali.length >= 2) return
    setOspedali([...ospedali, { ...ospedaleVuoto }])
  }

  const rimuoviOspedale = (index) => {
    if (ospedali.length <= 1) return
    setOspedali(ospedali.filter((_, i) => i !== index))
  }

  const aggiornaOspedale = (index, campo, valore) => {
    const nuovi = [...ospedali]
    nuovi[index] = { ...nuovi[index], [campo]: valore }
    setOspedali(nuovi)
  }

  const handleSalva = async () => {
    setErrore('')

    const ospedaliValidi = ospedali.every(o => o.nome.trim() && Number(o.tariffaOraria) > 0)
    if (!ospedaliValidi) {
      setErrore('Compila nome e tariffa oraria per ogni ospedale')
      return
    }
    if (!massimale || Number(massimale) <= 0) {
      setErrore('Inserisci il massimale forfettario')
      return
    }

    await salva({
      ospedali: ospedali.map(o => ({
        nome: o.nome.trim(),
        tariffaOraria: Number(o.tariffaOraria)
      })),
      massimale: Number(massimale),
      onboardingDone: true
    })

    if (onSalvato) onSalvato()
  }

  if (loading) return <p>Caricamento...</p>

  return (
    <div style={{ maxWidth: 480, margin: '0 auto', padding: 16 }}>
      <h2>Impostazioni</h2>

      <h3>Ospedali</h3>
      {ospedali.map((osp, i) => (
        <div key={i} style={{ marginBottom: 12, padding: 12, border: '1px solid #ddd', borderRadius: 8 }}>
          <div style={{ marginBottom: 8 }}>
            <label>Nome ospedale</label>
            <input
              type="text"
              value={osp.nome}
              onChange={e => aggiornaOspedale(i, 'nome', e.target.value)}
              style={{ display: 'block', width: '100%', padding: 8, marginTop: 4 }}
            />
          </div>
          <div style={{ marginBottom: 8 }}>
            <label>Tariffa oraria (€)</label>
            <input
              type="number"
              value={osp.tariffaOraria}
              onChange={e => aggiornaOspedale(i, 'tariffaOraria', e.target.value)}
              style={{ display: 'block', width: '100%', padding: 8, marginTop: 4 }}
            />
          </div>
          {ospedali.length > 1 && (
            <button onClick={() => rimuoviOspedale(i)} style={{ color: 'red', background: 'none', border: 'none', cursor: 'pointer' }}>
              Rimuovi
            </button>
          )}
        </div>
      ))}

      {ospedali.length < 2 && (
        <button onClick={aggiungiOspedale} style={{ marginBottom: 16 }}>
          + Aggiungi ospedale
        </button>
      )}

      <h3>Massimale forfettario</h3>
      <div style={{ marginBottom: 16 }}>
        <label>Massimale annuo (€)</label>
        <input
          type="number"
          value={massimale}
          onChange={e => setMassimale(e.target.value)}
          style={{ display: 'block', width: '100%', padding: 8, marginTop: 4 }}
        />
      </div>

      {errore && <p style={{ color: 'red' }}>{errore}</p>}

      <button
        onClick={handleSalva}
        disabled={salvando}
        style={{ width: '100%', padding: 10 }}
      >
        {salvando ? 'Salvataggio...' : 'Salva impostazioni'}
      </button>
    </div>
  )
}