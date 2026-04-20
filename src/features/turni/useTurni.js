import { useState, useEffect } from 'react'
import { subscribeToTurni, aggiungiTurno, eliminaTurno } from '../../services/turniService'

export function useTurni(userId, anno) {
  const [turni, setTurni] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!userId || !anno) return
    setLoading(true)
    const unsubscribe = subscribeToTurni(userId, anno, (dati) => {
      setTurni(dati)
      setLoading(false)
    })
    return unsubscribe
  }, [userId, anno])

  const aggiungi = async (turno) => {
    await aggiungiTurno({ ...turno, userId, anno })
  }

  const elimina = async (turnoId) => {
    await eliminaTurno(turnoId)
  }

  return { turni, loading, aggiungi, elimina }
}