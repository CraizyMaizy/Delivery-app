export const formatPhone = (rawPhone: string): string => {
  const digits = rawPhone.replace(/\D/g, '')

  let normalized = digits
  if (normalized.length === 11 && normalized.startsWith('8')) {
    normalized = '7' + normalized.slice(1)
  }
  if (normalized.length !== 11) return rawPhone

  const code = normalized.slice(1, 4)
  const part1 = normalized.slice(4, 7)
  const part2 = normalized.slice(7, 9)
  const part3 = normalized.slice(9, 11)

  return `+7 (${code}) ${part1}-${part2}-${part3}`
}
