const PALETTE = ['#1A4C96', '#E8943A', '#0D3B7A', '#26B89D']

export function coloreOspedale(index) {
  return PALETTE[index % PALETTE.length]
}

export function siglaOspedale(nome) {
  return nome.slice(0, 2).toUpperCase()
}