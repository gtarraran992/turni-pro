import { useState, useEffect } from 'react'
import { useImpostazioni } from './useImpostazioni'
import { coloreOspedale } from '../../utils/colori'
import { eliminaAccount } from '../../services/utenteService'

const ospedaleVuoto = { nome: '', tariffaOraria: '' }

export function Impostazioni({ userId, user, onSalvato, onNavigaLegal, onNavigaTermini, onLogout }) {
  const { profilo, loading, salvando, salva } = useImpostazioni(userId)
  const [ospedali, setOspedali] = useState([{ ...ospedaleVuoto }])
  const [massimale, setMassimale] = useState('')
  const [errore, setErrore] = useState('')
  const [mostraConferma, setMostraConferma] = useState(false)
  const [eliminando, setEliminando] = useState(false)

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

  const handleEliminaAccount = async () => {
    setEliminando(true)
    try {
      await eliminaAccount(userId, user)
    } catch (e) {
      setEliminando(false)
      setMostraConferma(false)
      setErrore('Errore durante l\'eliminazione. Riprova.')
    }
  }

  if (loading) return <p>Caricamento...</p>

  return (
    <div style={{ maxWidth: 480, margin: '0 auto', padding: '20px 16px' }}>
      <h2 style={{ fontSize: 20, fontWeight: '700', color: '#1a1a1a', margin: '0 0 24px 0' }}>
        Impostazioni
      </h2>

      {/* Sezione ospedali */}
      <div style={{ marginBottom: 24 }}>
        <div style={{ fontSize: 12, fontWeight: '600', color: '#888', textTransform: 'uppercase', letterSpacing: '0.8px', marginBottom: 12 }}>
          Ospedali
        </div>

        {ospedali.map((osp, i) => (
          <div key={i} style={{
            marginBottom: 10,
            padding: 16,
            background: 'white',
            border: `1.5px solid ${coloreOspedale(i)}44`,
            borderLeft: `4px solid ${coloreOspedale(i)}`,
            borderRadius: 12,
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <div style={{ width: 8, height: 8, borderRadius: '50%', background: coloreOspedale(i) }} />
                <span style={{ fontSize: 13, fontWeight: '600', color: '#333' }}>Ospedale {i + 1}</span>
              </div>
              {ospedali.length > 1 && (
                <button
                  onClick={() => rimuoviOspedale(i)}
                  style={{ background: 'none', border: 'none', color: '#ef4444', cursor: 'pointer', fontSize: 12, fontWeight: '500' }}
                >
                  Rimuovi
                </button>
              )}
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
              <div>
                <label style={{ fontSize: 12, color: '#888', display: 'block', marginBottom: 4 }}>Nome</label>
                <input
                  type="text"
                  value={osp.nome}
                  onChange={e => aggiornaOspedale(i, 'nome', e.target.value)}
                  placeholder="Es. Treviso"
                  style={{ width: '100%', padding: '8px 10px', borderRadius: 8, border: '1px solid #e6e8eb', fontSize: 14, color: '#1a1a1a', boxSizing: 'border-box' }}
                />
              </div>
              <div>
                <label style={{ fontSize: 12, color: '#888', display: 'block', marginBottom: 4 }}>Tariffa (€/h)</label>
                <input
                  type="number"
                  value={osp.tariffaOraria}
                  onChange={e => aggiornaOspedale(i, 'tariffaOraria', e.target.value)}
                  placeholder="Es. 80"
                  style={{ width: '100%', padding: '8px 10px', borderRadius: 8, border: '1px solid #e6e8eb', fontSize: 14, color: '#1a1a1a', boxSizing: 'border-box' }}
                />
              </div>
            </div>
          </div>
        ))}

        {ospedali.length < 2 && (
          <button
            onClick={aggiungiOspedale}
            style={{ width: '100%', padding: '10px', background: 'white', border: '1.5px dashed #e6e8eb', borderRadius: 12, cursor: 'pointer', fontSize: 13, color: '#888', fontWeight: '500' }}
          >
            + Aggiungi ospedale
          </button>
        )}
      </div>

      {/* Sezione massimale */}
      <div style={{ marginBottom: 24 }}>
        <div style={{ fontSize: 12, fontWeight: '600', color: '#888', textTransform: 'uppercase', letterSpacing: '0.8px', marginBottom: 12 }}>
          Massimale forfettario
        </div>
        <div style={{ padding: 16, background: 'white', border: '1px solid #e6e8eb', borderRadius: 12 }}>
          <label style={{ fontSize: 12, color: '#888', display: 'block', marginBottom: 4 }}>Massimale annuo (€)</label>
          <input
            type="number"
            value={massimale}
            onChange={e => setMassimale(e.target.value)}
            placeholder="Es. 85000"
            style={{ width: '100%', padding: '8px 10px', borderRadius: 8, border: '1px solid #e6e8eb', fontSize: 14, color: '#1a1a1a', boxSizing: 'border-box' }}
          />
        </div>
      </div>

      {errore && (
        <div style={{ marginBottom: 16, padding: '10px 12px', background: '#fff0f0', border: '1px solid #fecaca', borderRadius: 8, fontSize: 13, color: '#ef4444' }}>
          {errore}
        </div>
      )}

      <button
        onClick={handleSalva}
        disabled={salvando}
        style={{ width: '100%', padding: 12, background: salvando ? '#93c5fd' : '#3b82f6', color: 'white', border: 'none', borderRadius: 12, cursor: salvando ? 'default' : 'pointer', fontSize: 15, fontWeight: '600' }}
      >
        {salvando ? 'Salvataggio...' : 'Salva impostazioni'}
      </button>

{/* Link legali */}
      <div style={{ display: 'flex', gap: 10, marginTop: 24 }}>
        <button
          onClick={onNavigaLegal}
          style={stileBtnSecondario}
        >
          Privacy Policy
        </button>
        <button
          onClick={onNavigaTermini}
          style={stileBtnSecondario}
        >
          Termini di Servizio
        </button>
      </div>

      {/* Esci */}
      <button
        onClick={onLogout}
        style={{ ...stileBtnSecondario, width: '100%', marginTop: 10 }}
      >
        Esci dall'account
      </button>

      {/* Elimina account */}
      <button
        onClick={() => setMostraConferma(true)}
        style={{
          width: '100%', padding: 14,
          background: 'transparent',
          border: '1.5px solid #ef4444',
          borderRadius: 14, cursor: 'pointer',
          fontSize: 15, fontWeight: '600',
          color: '#ef4444', marginTop: 10
        }}
      >
        Elimina account
      </button>

      {/* Modale conferma */}
      {mostraConferma && (
        <>
          <div
            onClick={() => !eliminando && setMostraConferma(false)}
            style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.4)', zIndex: 100 }}
          />
          <div style={{
            position: 'fixed',
            top: '50%', left: '50%',
            transform: 'translate(-50%, -50%)',
            background: 'white',
            borderRadius: 16,
            padding: 24,
            zIndex: 101,
            width: '80%',
            maxWidth: 400,
          }}>
            <h3 style={{ margin: '0 0 8px', fontSize: 17, color: '#1a1a1a' }}>Elimina account</h3>
            <p style={{ fontSize: 14, color: '#6b7280', marginBottom: 20 }}>
              Sei sicuro? Questa azione è irreversibile. Tutti i tuoi turni e dati verranno eliminati definitivamente.
            </p>
            <div style={{ display: 'flex', gap: 10 }}>
              <button
                onClick={() => setMostraConferma(false)}
                disabled={eliminando}
                style={{ flex: 1, padding: 10, background: '#f5f5f5', border: 'none', borderRadius: 10, cursor: 'pointer', fontSize: 14, fontWeight: '500' }}
              >
                Annulla
              </button>
              <button
                onClick={handleEliminaAccount}
                disabled={eliminando}
                style={{ flex: 1, padding: 10, background: '#ef4444', border: 'none', borderRadius: 10, cursor: eliminando ? 'default' : 'pointer', fontSize: 14, fontWeight: '600', color: 'white' }}
              >
                {eliminando ? 'Eliminazione...' : 'Elimina'}
              </button>
            </div>
          </div>
        </>
      )}
    <div style={{ textAlign: 'center', marginTop: 24, fontSize: 12, color: '#ccc' }}>
      Turni Pro v{__APP_VERSION__}
    </div>
    </div>
  )
}

const stileBtnSecondario = {
  flex: 1,
  padding: '12px 8px',
  background: 'white',
  border: '1px solid #e6e8eb',
  borderRadius: 14,
  cursor: 'pointer',
  fontSize: 13,
  fontWeight: '500',
  color: '#374151'
}