export function Legal({ onBack }) {
  return (
    <div style={{ maxWidth: 480, margin: '0 auto', padding: '20px 16px' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 24 }}>
        <button onClick={onBack} style={stileBack}>←</button>
        <h2 style={{ margin: 0, fontSize: 20, fontWeight: '700', color: '#1a1a1a' }}>
          Privacy Policy
        </h2>
      </div>

      <div style={stileContenuto}>
        <p style={stileData}>Ultimo aggiornamento: Giugno 2026</p>

        <p><strong>Titolare del trattamento:</strong> Giacomo Tarraran — <a href="mailto:gtarraran992@gmail.com" style={stileLink}>gtarraran992@gmail.com</a></p>

        <h3 style={stileH3}>1. Introduzione</h3>
        <p>Turni Pro ("noi", "nostra", "app") rispetta la tua privacy. Questa Privacy Policy descrive come raccogliamo, utilizziamo e proteggiamo le tue informazioni personali.</p>

        <h3 style={stileH3}>2. Dati raccolti</h3>
        <p>Raccogliamo i seguenti dati:</p>
        <ul style={stileUl}>
          <li>Email (tramite registrazione)</li>
          <li>Dati dei turni lavorativi (date, ore, compensi)</li>
          <li>Configurazione ospedali e tariffe orarie</li>
          <li>Massimale forfettario annuo</li>
        </ul>

        <h3 style={stileH3}>3. Utilizzo dei dati</h3>
        <p>I dati vengono utilizzati esclusivamente per:</p>
        <ul style={stileUl}>
          <li>Fornire le funzionalità dell'app (monitoraggio turni, calcolo compensi)</li>
          <li>Identificare l'utente all'interno dell'app</li>
          <li>Calcolare il fatturato annuale e il residuo del massimale forfettario</li>
        </ul>

        <h3 style={stileH3}>4. Condivisione dei dati</h3>
        <p>Non vendiamo né condividiamo i tuoi dati con terze parti. I dati sono archiviati su Firebase (Google) con sede nell'Unione Europea.</p>

        <h3 style={stileH3}>5. Conservazione dei dati</h3>
        <p>I tuoi dati vengono conservati finché il tuo account è attivo. Puoi richiedere la cancellazione del tuo account e di tutti i dati associati in qualsiasi momento contattandoci via email.</p>

        <h3 style={stileH3}>6. Diritti dell'utente</h3>
        <p>Hai il diritto di accedere, modificare ed eliminare i tuoi dati personali. Per qualsiasi richiesta contattaci a: <a href="mailto:gtarraran992@gmail.com" style={stileLink}>gtarraran992@gmail.com</a></p>

        <h3 style={stileH3}>7. Contatti</h3>
        <p>Per domande sulla privacy: <a href="mailto:gtarraran992@gmail.com" style={stileLink}>gtarraran992@gmail.com</a></p>
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

const stileUl = {
  paddingLeft: 20,
  display: 'flex',
  flexDirection: 'column',
  gap: 4,
  margin: 0
}

const stileData = {
  fontSize: 12,
  color: '#aaa',
  fontStyle: 'italic'
}

const stileLink = { color: '#3b82f6' }