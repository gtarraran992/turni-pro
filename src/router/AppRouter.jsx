import { useState, useEffect } from 'react'
import { useAuth } from '../hooks/useAuth'
import { getProfilo } from '../services/utenteService'
import { Login } from '../pages/Login'
import { AppLayout } from '../layouts/AppLayout'
import { Impostazioni } from '../features/impostazioni/Impostazioni'
import { SplashScreen } from '../pages/SplashScreen'

export function AppRouter() {
  const { user } = useAuth()
  const [profilo, setProfilo] = useState(undefined)
  const [splashDone, setSplashDone] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => setSplashDone(true), 2400)
    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    if (!user) {
      setProfilo(null)
      return
    }
    getProfilo(user.uid).then(p => setProfilo(p))
  }, [user])

  return (
    <>
      {!splashDone && <SplashScreen />}

      {splashDone && (() => {
        if (user === undefined || profilo === undefined) return <div />
        if (user === null) return <Login />
        if (!profilo?.onboardingDone) {
          return (
            <Impostazioni
              userId={user.uid}
              user={user}
              onSalvato={() => getProfilo(user.uid).then(setProfilo)}
              onNavigaLegal={() => {}}
              onNavigaTermini={() => {}}
              onLogout={() => {}}
            />
          )
        }
        return <AppLayout />
      })()}
    </>
  )
}