import { describe, it, expect } from 'vitest'
import { formatPhone } from './formatPhone'

describe('formatPhone', () => {
  it('formats phone numbers from 8 to +7', () => {
    expect(formatPhone('89991234567')).toBe('+7 (999) 123-45-67')
  })

  it('formats phone numbers from +7 to common format', () => {
    expect(formatPhone('+7 999 123 45 67')).toBe('+7 (999) 123-45-67')
  })

  it('formats phone numbers from 10 without state code', () => {
    expect(formatPhone('9991234567')).toBe('+7 (999) 123-45-67')
  })

  it('return empty str for undefined', () => {
    expect(formatPhone(undefined)).toBe('')
  })

  it('return str if not recognized', () => {
    expect(formatPhone('123')).toBe('123')
  })
})
