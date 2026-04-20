import { collection, addDoc, deleteDoc, doc, query, where, onSnapshot, serverTimestamp } from 'firebase/firestore'
import { db } from './firebase'

export function subscribeToTurni(userId, anno, callback) {
  const q = query(
    collection(db, 'turni'),
    where('userId', '==', userId),
    where('anno', '==', anno)
  )
  return onSnapshot(q, snap => {
    const turni = snap.docs.map(d => ({ id: d.id, ...d.data() }))
    callback(turni)
  })
}

export async function aggiungiTurno(turno) {
  await addDoc(collection(db, 'turni'), {
    ...turno,
    createdAt: serverTimestamp()
  })
}

export async function eliminaTurno(turnoId) {
  await deleteDoc(doc(db, 'turni', turnoId))
}