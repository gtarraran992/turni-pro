import { useMemo, useRef, useState } from 'react'
import {
  format, startOfMonth, startOfWeek, addDays,
  addMonths, subMonths, isSameDay, isSameMonth, getDay
} from 'date-fns'
import { it } from 'date-fns/locale'
import { coloreOspedale, siglaOspedale } from '../../utils/colori'
import { euro } from '../../utils/euro'

function buildDays(monthDate) {
  const startMonth = startOfMonth(monthDate)
  const startDate = startOfWeek(startMonth, { weekStartsOn: 1 })
  const giorni = []
  for (let i = 0; i < 42; i++) giorni.push(addDays(startDate, i))
  const lastWeek = giorni.slice(35, 42)
  const allNextMonth = lastWeek.every(d => !isSameMonth(d, monthDate))
  return allNextMonth ? giorni.slice(0, 35) : giorni
}

function MonthGrid({ days, monthDate, turniPerGiorno, mappaColori, onClickDay }) {
  return (
    <div style={{
      display: 'grid',
      gridTemplateColumns: 'repeat(7, 1fr)',
      gridTemplateRows: `repeat(${days.length / 7}, 1fr)`,
      gap: 3,
      minHeight: 320,
      width: '100%',
      flexShrink: 0
    }}>
      {days.map(date => {
        const key = format(date, 'yyyy-MM-dd')
        const turnoInfo = turniPerGiorno[key]
        const turno = turnoInfo?.turno
        const parte = turnoInfo?.parte
        const oggi = isSameDay(date, new Date())
        const stessoMese = isSameMonth(date, monthDate)
        const dayIndex = getDay(date)

        const notturno = turno?.notturno
        const colore = turno ? (notturno ? '#22c55e' : mappaColori[turno.ospedale]) : null
        const sigla = turno ? siglaOspedale(turno.ospedale) : null

        return (
          <div
            key={key}
            onClick={() => onClickDay(date, parte === 'end' ? null : turno)}
            style={{
              position: 'relative',
              overflow: 'visible',
              background: oggi ? '#eff6ff' : stessoMese ? 'white' : '#f5f7fa',
              border: oggi ? '2px solid #3b82f6' : '1px solid #e6e8eb',
              borderRadius: 10,
              padding: '5px 2px',
              cursor: 'pointer',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'flex-start',
              minHeight: 52,
              boxShadow: stessoMese && !oggi ? '0 1px 2px rgba(0,0,0,0.04)' : 'none'
            }}
          >
            <div style={{
              fontSize: 13,
              fontWeight: oggi ? '700' : '500',
              color: oggi ? '#1d4ed8' : stessoMese ? '#333' : '#bbb'
            }}>
              {date.getDate()}
            </div>

            {turno && parte !== 'end' && (
              <div style={{
                position: notturno ? 'absolute' : 'static',
                bottom: notturno ? 6 : 'auto',
                left: notturno ? '50%' : 'auto',
                right: notturno ? '-50%' : 'auto',
                background: colore,
                color: 'white',
                borderRadius: 10,
                fontSize: 12,
                fontWeight: '700',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '3px 12px',
                marginTop: notturno ? 0 : 5,
                zIndex: 5,
                pointerEvents: 'none'
              }}>
                {sigla}
              </div>
            )}
          </div>
        )
      })}
    </div>
  )
}

export function Calendario({ turni, ospedali, onGiornoClick }) {
  const oggi = new Date()
  const [currentDate, setCurrentDate] = useState(oggi)
  const [offset, setOffset] = useState(0)
  const [dragging, setDragging] = useState(false)
  const startX = useRef(null)
  const sliderRef = useRef(null)
  const threshold = 80

  const mappaColori = {}
  const mappaIndice = {}
  ospedali.forEach((osp, i) => {
    mappaColori[osp.nome] = coloreOspedale(i)
    mappaIndice[osp.nome] = i
  })

const turniPerGiorno = useMemo(() => {
  const map = {}
  turni.forEach(t => {
    const data = t.data?.toDate?.()
    if (!data) return
    const keyStart = format(data, 'yyyy-MM-dd')
    map[keyStart] = { turno: t, parte: 'start' }

    if (t.notturno) {
      const giornoSuccessivo = addDays(data, 1)
      const keyEnd = format(giornoSuccessivo, 'yyyy-MM-dd')
      map[keyEnd] = { turno: t, parte: 'end' }
    }
  })
  return map
}, [turni])

  const meseCorrente = currentDate.getMonth() + 1
  const annoCorrente = currentDate.getFullYear()

  const turniDelMese = turni.filter(t => t.mese === meseCorrente && t.anno === annoCorrente)
  const totalePerOspedale = {}
  ospedali.forEach(osp => { totalePerOspedale[osp.nome] = 0 })
  turniDelMese.forEach(t => {
    if (totalePerOspedale[t.ospedale] !== undefined)
      totalePerOspedale[t.ospedale] += t.totale || 0
  })

  const prevMonth = subMonths(currentDate, 1)
  const nextMonth = addMonths(currentDate, 1)
  const prevDays = useMemo(() => buildDays(prevMonth), [prevMonth])
  const currDays = useMemo(() => buildDays(currentDate), [currentDate])
  const nextDays = useMemo(() => buildDays(nextMonth), [nextMonth])

  const label = format(currentDate, 'MMMM yyyy', { locale: it })
  const labelFormattato = label.charAt(0).toUpperCase() + label.slice(1)

  function touchStart(e) {
    startX.current = e.touches[0].clientX
    setDragging(true)
  }

  function touchMove(e) {
    if (!dragging) return
    const diff = e.touches[0].clientX - startX.current
    const move = diff * 0.8
    requestAnimationFrame(() => {
      if (sliderRef.current)
        sliderRef.current.style.transform = `translateX(calc(-100% + ${move}px))`
    })
    setOffset(move)
  }

  function touchEnd() {
    setDragging(false)
    if (offset < -threshold) {
      setTimeout(() => { setCurrentDate(nextMonth); setOffset(0) }, 300)
      return
    }
    if (offset > threshold) {
      setTimeout(() => { setCurrentDate(prevMonth); setOffset(0) }, 300)
      return
    }
    setOffset(0)
    if (sliderRef.current)
      sliderRef.current.style.transform = 'translateX(-100%)'
  }

  function handleClickDay(date, turno) {
    onGiornoClick({
      giorno: date.getDate(),
      mese: date.getMonth() + 1,
      anno: date.getFullYear(),
      turnoEsistente: turno || null
    })
  }

  return (
    <div style={{ fontFamily: 'system-ui, sans-serif' }}>
      {/* Titolo */}
      <h2 style={{ textAlign: 'center', margin: '4px 0 10px 0', fontSize: 22, fontWeight: 'bold' }}>
        {labelFormattato}
      </h2>

      {/* Intestazione giorni */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(7, 1fr)',
        textAlign: 'center',
        fontWeight: '600',
        fontSize: 13,
        marginBottom: 6
      }}>
        {['Lun','Mar','Mer','Gio','Ven','Sab','Dom'].map(g => (
          <div key={g}>{g}</div>
        ))}
      </div>

      {/* Slider mesi */}
      <div
        style={{ overflow: 'hidden' }}
        onTouchStart={touchStart}
        onTouchMove={touchMove}
        onTouchEnd={touchEnd}
      >
        <div
          ref={sliderRef}
          style={{
            display: 'flex',
            transform: `translateX(calc(-100% + ${offset}px))`,
            transition: dragging ? 'none' : 'transform 0.35s cubic-bezier(.25,.8,.25,1)',
            willChange: 'transform'
          }}
        >
          <MonthGrid days={prevDays} monthDate={prevMonth} turniPerGiorno={turniPerGiorno} mappaColori={mappaColori} onClickDay={handleClickDay} />
          <MonthGrid days={currDays} monthDate={currentDate} turniPerGiorno={turniPerGiorno} mappaColori={mappaColori} onClickDay={handleClickDay} />
          <MonthGrid days={nextDays} monthDate={nextMonth} turniPerGiorno={turniPerGiorno} mappaColori={mappaColori} onClickDay={handleClickDay} />
        </div>
      </div>

      {/* Card ospedali */}
      <div style={{ display: 'flex', gap: 12, marginTop: 20 }}>
        {ospedali.map((osp, i) => (
          <div key={i} style={{
            flex: 1,
            padding: 16,
            borderRadius: 12,
            background: coloreOspedale(i) + '18',
            border: `1px solid ${coloreOspedale(i)}33`
          }}>
            <div style={{ fontWeight: '600', color: '#333', marginBottom: 2 }}>{osp.nome}</div>
            <div style={{ fontSize: 12, color: '#888', marginBottom: 8 }}>
              {labelFormattato}
            </div>
            <div style={{ fontSize: 20, fontWeight: 'normal', color: '#222' }}>
              {euro(totalePerOspedale[osp.nome])} €
            </div>
          </div>
        ))}
      </div>

      {/* Navigazione */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 16, marginTop: 20 }}>
        <button onClick={() => setCurrentDate(prevMonth)} style={stileNavBtn}>←</button>
        <button onClick={() => setCurrentDate(oggi)} style={{ ...stileNavBtn, padding: '8px 20px', fontWeight: '400' }}>Oggi</button>
        <button onClick={() => setCurrentDate(nextMonth)} style={stileNavBtn}>→</button>
      </div>
    </div>
  )
}

const stileNavBtn = {
  background: 'white',
  border: '1px solid #eee',
  borderRadius: 8,
  padding: '8px 14px',
  cursor: 'pointer',
  fontSize: 16,
  boxShadow: '0 1px 3px rgba(0,0,0,0.06)'
}