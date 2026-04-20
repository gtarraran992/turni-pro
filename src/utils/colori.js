const PALETTE = ['#4A90D9', '#E8943A', '#5BB85D', '#9B59B6']

export function coloreOspedale(index) {
  return PALETTE[index % PALETTE.length]
}

export function siglaOspedale(nome) {
  return nome.slice(0, 2).toUpperCase()
}