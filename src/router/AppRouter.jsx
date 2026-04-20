import { useState, useEffect } from 'react'
import { useAuth } from '../hooks/useAuth'
import { getProfilo } from '../services/utenteService'
import { Login } from '../pages/Login'
import { AppLayout } from '../layouts/AppLayout'
import { Impostazioni } from '../features/impostazioni/Impostazioni'

export function AppRouter() {
  const { user } = useAuth()
  const [profilo, setProfilo] = useState(undefined)

  useEffect(() => {
    if (!user) {
      setProfilo(null)
      return
    }
    getProfilo(user.uid).then(p => setProfilo(p))
  }, [user])

  if (user === undefined || profilo === undefined) return <div>Caricamento...</div>
  if (user === null) return <Login />
  if (!profilo?.onboardingDone) {
    return (
      <Impostazioni
        userId={user.uid}
        onSalvato={() => getProfilo(user.uid).then(setProfilo)}
      />
    )
  }

  return <AppLayout />
}