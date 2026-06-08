# Turni Pro

App per il monitoraggio dei turni lavorativi e dei compensi in regime forfettario, pensata per medici e professionisti sanitari.

## Funzionalità

- **Calendario mensile** — visualizzazione turni con badge colorati per ospedale, swipe touch tra i mesi
- **Inserimento turni** — aggiunta rapida tramite tap sul giorno, supporto turni notturni
- **Calcolo compensi** — ore × tariffa oraria, snapshot della tariffa al momento del salvataggio
- **Monitoraggio massimale** — controllo del fatturato annuo rispetto al massimale forfettario con barra di avanzamento
- **Configurazione personalizzata** — ogni utente imposta i propri ospedali e tariffe orarie (max 2)
- **Multi-utente** — ogni utente vede solo i propri dati

## Stack

| Layer | Tecnologia |
|---|---|
| Frontend | React + Vite (PWA) |
| Database | Firebase Firestore |
| Autenticazione | Firebase Auth (email/password) |
| Hosting | Vercel |
| Mobile | Capacitor + Android |

## Struttura progetto

```
src/
  components/
    ui/                         # Componenti UI riutilizzabili
  context/
    TurniContext.jsx
  features/
    impostazioni/
      Impostazioni.jsx          # Pagina impostazioni utente
      useImpostazioni.js        # Hook profilo utente
    turni/
      Calendario.jsx            # Calendario mensile con swipe
      ModaleTurno.jsx           # Modale aggiunta/eliminazione turno
      useTurni.js               # Hook CRUD turni
  hooks/
    useAuth.js                  # Hook autenticazione Firebase
  layouts/
    AppLayout.jsx               # Layout con navigazione bottom
  pages/
    Dashboard.jsx               # Pagina principale
    Login.jsx                   # Pagina login + reset password
    Legal.jsx                   # Privacy Policy
    Termini.jsx                 # Termini di Servizio
  router/
    AppRouter.jsx               # Routing + guard autenticazione
  services/
    firebase.js                 # Inizializzazione Firebase
    turniService.js             # CRUD turni su Firestore
    utenteService.js            # CRUD profilo utente su Firestore
  utils/
    colori.js                   # Palette colori e sigle ospedali
    euro.js                     # Formattatore valuta
  App.jsx
  main.jsx
```

## Struttura dati Firestore

### `users/{userId}`
```js
{
  ospedali: [
    { nome: string, tariffaOraria: number }
  ],
  massimale: number,
  onboardingDone: boolean
}
```

### `turni/{turnoId}`
```js
{
  userId: string,
  anno: number,
  mese: number,        // 1–12
  data: timestamp,
  ore: number,
  ospedale: string,
  tariffaOraria: number,  // snapshot al momento del salvataggio
  totale: number,         // ore × tariffaOraria
  notturno: boolean,
  createdAt: timestamp
}
```

## Regole Firestore

```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /users/{userId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }
    match /turni/{turnoId} {
      allow read, write: if request.auth != null && request.auth.uid == resource.data.userId;
      allow create: if request.auth != null && request.auth.uid == request.resource.data.userId;
    }
  }
}
```

## Setup locale

```bash
# Clona il repository
git clone https://github.com/tuousername/turni-pro.git
cd turni-pro

# Installa le dipendenze
npm install

# Crea il file .env con le credenziali Firebase
cp .env.example .env
# Modifica .env con i tuoi valori

# Avvia il server di sviluppo
npm run dev
```

### Variabili d'ambiente

```env
VITE_FIREBASE_API_KEY=
VITE_FIREBASE_AUTH_DOMAIN=
VITE_FIREBASE_PROJECT_ID=
VITE_FIREBASE_STORAGE_BUCKET=
VITE_FIREBASE_MESSAGING_SENDER_ID=
VITE_FIREBASE_APP_ID=
```

## Build e deploy

```bash
# Build produzione
npm run build

# Sync Android (dopo ogni build)
npx cap sync

# Apri in Android Studio
npx cap open android
```

Il deploy su Vercel avviene automaticamente ad ogni push sul branch `main`.

## Note tecniche

- `color-scheme: light only` in `index.css` per forzare la modalità chiara su Android
- La tariffa oraria viene salvata come snapshot su ogni turno per preservare la correttezza storica dei compensi
- `vite-plugin-pwa` installato per il supporto PWA
- `.npmrc` con `legacy-peer-deps=true` per la compatibilità con i plugin Vite su Vercel

## Privacy

La privacy policy e i termini di servizio sono disponibili su `/privacy.html` (hosting Vercel) e nella sezione Impostazioni dell'app.

## Contatti

Giacomo Tarraran — [gtarraran992@gmail.com](mailto:gtarraran992@gmail.com)
