import { useEffect, useState } from 'react'

export function SplashScreen() {
  const [fade, setFade] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => setFade(true), 1800)
    return () => clearTimeout(timer)
  }, [])

  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      background: '#0D3B7A',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 9999,
      opacity: fade ? 0 : 1,
      transition: 'opacity 0.5s ease',
      pointerEvents: 'none'
    }}>
      <img
        src="/icon-1024.png"
        alt="Turni Pro"
        style={{
          width: 100,
          height: 100,
          borderRadius: 24,
          marginBottom: 24,
          animation: 'splashPop 0.6s cubic-bezier(.34,1.56,.64,1) both'
        }}
      />
      <h1 style={{
        color: 'white',
        fontSize: 28,
        fontWeight: '700',
        margin: '0 0 6px',
        animation: 'splashFadeUp 0.6s 0.2s ease both'
      }}>
        Turni Pro
      </h1>
      <p style={{
        color: 'rgba(255,255,255,0.6)',
        fontSize: 13,
        margin: 0,
        letterSpacing: '0.1em',
        animation: 'splashFadeUp 0.6s 0.3s ease both'
      }}>
        Monitoraggio turni e compensi
      </p>

      <style>{`
        @keyframes splashPop {
          from { opacity: 0; transform: scale(0.7); }
          to { opacity: 1; transform: scale(1); }
        }
        @keyframes splashFadeUp {
          from { opacity: 0; transform: translateY(12px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  )
}