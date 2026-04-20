import { useState, useEffect } from 'react'
import { getProfilo, salvaProfilo } from '../../services/utenteService'

export function useImpostazioni(userId) {
  const [profilo, setProfilo] = useState(null)
  const [loading, setLoading] = useState(true)
  const [salvando, setSalvando] = useState(false)

  useEffect(() => {
    if (!userId) return
    getProfilo(userId).then(p => {
      setProfilo(p)
      setLoading(false)
    })
  }, [userId])

  const salva = async (dati) => {
    setSalvando(true)
    await salvaProfilo(userId, dati)
    setProfilo(dati)
    setSalvando(false)
  }

  return { profilo, loading, salvando, salva }
}