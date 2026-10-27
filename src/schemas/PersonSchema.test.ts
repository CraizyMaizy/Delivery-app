import { describe, it, expect } from 'vitest'
import { PersonSchema } from './PersonSchema'
import { person } from '../test/fixtures'

describe('Person schema', () => {
  it('get correct data', () => {
    expect(PersonSchema.safeParse(person).success).toBe(true)
  })

  it.each(['lastname', 'firstname', 'middlename', 'phone'])(
    'reject empty field %s',
    (field) => {
      const result = PersonSchema.safeParse({ ...person, [field]: '' })
      expect(result.success).toBe(false)
    }
  )

  it('reject too short phone', () => {
    const result = PersonSchema.safeParse({ ...person, phone: '123' })
    expect(result.success).toBe(false)
  })
})
