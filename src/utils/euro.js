export function euro(n) {
  const num = Number(n || 0)
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")
}