import { useState, useEffect } from 'react'
import { onAuthStateChanged, signInWithEmailAndPassword, signOut } from 'firebase/auth'
import { auth } from '../services/firebase'

export function useAuth() {
  const [user, setUser] = useState(undefined)

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (u) => setUser(u))
    return unsubscribe
  }, [])

  const login = (email, password) => signInWithEmailAndPassword(auth, email, password)
  const logout = () => signOut(auth)

  return { user, login, logout }
}