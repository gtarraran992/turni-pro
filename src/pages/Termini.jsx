export function Termini({ onBack }) {
  return (
    <div style={{ maxWidth: 480, margin: '0 auto', padding: '20px 16px' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 24 }}>
        <button onClick={onBack} style={stileBack}>←</button>
        <h2 style={{ margin: 0, fontSize: 20, fontWeight: '700', color: '#1a1a1a' }}>
          Termini di Servizio
        </h2>
      </div>

      <div style={stileContenuto}>
        <p style={stileData}>Ultimo aggiornamento: Giugno 2026</p>

        <h3 style={stileH3}>1. Accettazione dei termini</h3>
        <p>Utilizzando Turni Pro accetti i presenti Termini di Servizio. Se non li accetti, ti preghiamo di non utilizzare l'app.</p>

        <h3 style={stileH3}>2. Descrizione del servizio</h3>
        <p>Turni Pro è un'app per il monitoraggio dei turni lavorativi e dei compensi in regime forfettario. Permette di tracciare i turni, calcolare i compensi e monitorare il massimale annuo.</p>

        <h3 style={stileH3}>3. Account utente</h3>
        <p>Per utilizzare Turni Pro è necessario creare un account. Sei responsabile della sicurezza delle tue credenziali di accesso.</p>

        <h3 style={stileH3}>4. Comportamento dell'utente</h3>
        <p>Ti impegni a non utilizzare l'app per scopi illeciti o per danneggiare altri utenti.</p>

        <h3 style={stileH3}>5. Limitazione di responsabilità</h3>
        <p>Turni Pro è fornita "così com'è". Non garantiamo la disponibilità continua del servizio e non siamo responsabili per eventuali perdite di dati. I calcoli forniti dall'app hanno scopo informativo e non sostituiscono la consulenza di un professionista fiscale.</p>

        <h3 style={stileH3}>6. Modifiche ai termini</h3>
        <p>Ci riserviamo il diritto di modificare questi termini. Le modifiche saranno comunicate tramite aggiornamento dell'app.</p>

        <h3 style={stileH3}>7. Legge applicabile</h3>
        <p>I presenti termini sono regolati dalla legge italiana.</p>

        <h3 style={stileH3}>8. Contatti</h3>
        <p>Per domande: <a href="mailto:gtarraran992@gmail.com" style={{ color: '#3b82f6' }}>gtarraran992@gmail.com</a></p>
      </div>
    </div>
  )
}

const stileBack = {
  background: 'white',
  border: '1px solid #e6e8eb',
  borderRadius: 8,
  padding: '6px 12px',
  fontSize: 16,
  cursor: 'pointer',
  color: '#333'
}

const stileContenuto = {
  fontSize: 14,
  color: '#555',
  lineHeight: 1.8,
  display: 'flex',
  flexDirection: 'column',
  gap: 12
}

const stileH3 = {
  fontSize: 15,
  fontWeight: '600',
  color: '#1a1a1a',
  marginTop: 8,
  marginBottom: 0
}

const stileData = {
  fontSize: 12,
  color: '#aaa',
  fontStyle: 'italic'
}