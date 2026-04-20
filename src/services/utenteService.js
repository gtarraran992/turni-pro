import { doc, getDoc, setDoc } from 'firebase/firestore'
import { db } from './firebase'

export async function getProfilo(userId) {
  const ref = doc(db, 'users', userId)
  const snap = await getDoc(ref)
  return snap.exists() ? snap.data() : null
}

export async function salvaProfilo(userId, dati) {
  const ref = doc(db, 'users', userId)
  await setDoc(ref, dati, { merge: true })
}