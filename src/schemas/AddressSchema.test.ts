import { describe, it, expect } from 'vitest'
import { AddressSchema } from './AddressSchema'

const valid = { street: 'Ленина', house: '1', apartment: '2' }

describe('Address Schema', () => {
  it('get address without comment', () => {
    expect(AddressSchema.safeParse(valid).success).toBe(true)
  })

  it('default isNonContact = false', () => {
    const result = AddressSchema.safeParse(valid)
    expect(result.success).toBe(true)
    if (result.success) {
      expect(result.data.isNonContact).toBe(false)
    }
  })

  it.each(['street', 'house', 'apartment'])(
    'reject empty field %s',
    (field) => {
      const result = AddressSchema.safeParse({ ...valid, [field]: '' })
      expect(result.success).toBe(false)
    }
  )
})
