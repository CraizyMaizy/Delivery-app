import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { OrderBreadcrumb } from './OrderBreadcrumb'
import { orderSteps } from '../config/orderSteps.ts'

describe('OrderBreadcrumb', () => {
  it('show step only for current order', () => {
    render(
      <MemoryRouter>
        <OrderBreadcrumb currentStep={2} />
      </MemoryRouter>
    )
    expect(screen.getByText(orderSteps[1].label)).toBeInTheDocument()
    expect(screen.queryByText(orderSteps[2].label)).not.toBeInTheDocument()
  })
})
