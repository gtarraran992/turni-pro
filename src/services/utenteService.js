import { doc, getDoc, setDoc, deleteDoc, collection, query, where, getDocs, writeBatch } from 'firebase/firestore'
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

export async function eliminaAccount(userId, user) {
  const batch = writeBatch(db)

  // Elimina tutti i turni
  const turniQuery = query(collection(db, 'turni'), where('userId', '==', userId))
  const turniSnap = await getDocs(turniQuery)
  turniSnap.forEach(d => batch.delete(d.ref))

  // Elimina profilo utente
  batch.delete(doc(db, 'users', userId))

  await batch.commit()

  // Elimina utente da Firebase Auth
  await user.delete()
}