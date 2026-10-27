import { describe, it, expect } from 'vitest'
import { getNextStepPath, orderSteps } from './orderSteps'

describe('orderSteps', () => {
  it('from 1 step to 2', () => {
    expect(getNextStepPath(1)).toBe(orderSteps[1].path)
  })

  it('from the second to last to last', () => {
    expect(getNextStepPath(orderSteps.length - 1)).toBe(
      orderSteps[orderSteps.length - 1].path
    )
  })

  it('from the last step return null', () => {
    expect(getNextStepPath(orderSteps.length)).toBeNull()
  })
})

describe('orderSteps', () => {
  it('all steps unique', () => {
    const paths = orderSteps.map((step) => step.path)
    expect(new Set(paths).size).toBe(paths.length)
  })
})
