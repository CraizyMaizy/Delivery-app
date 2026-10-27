import { describe, it, expect } from 'vitest'
import { CalculateSchema } from './CalculateSchema'
import { envelope } from '../test/fixtures'

const valid = { fromCity: '1', toCity: '2', parcelSize: envelope }

const failedFields = (input: unknown) => {
  const result = CalculateSchema.safeParse(input)
  return result.success ? [] : result.error.issues.map((issue) => issue.path[0])
}

describe('Calculate Schema', () => {
  it('get correct data', () => {
    expect(CalculateSchema.safeParse(valid).success).toBe(true)
  })

  it('reject empty from city', () => {
    expect(failedFields({ ...valid, fromCity: '' })).toContain('fromCity')
  })

  it('reject empty to city', () => {
    expect(failedFields({ ...valid, toCity: '' })).toContain('toCity')
  })

  it('reject form without parcel size', () => {
    expect(failedFields({ ...valid, parcelSize: null })).toContain('parcelSize')
  })
})
