import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { StepperProgress } from './StepperProgress'
import { orderSteps } from '../config/orderSteps'

describe('<StepperProgressBar />', () => {
  it('not display current step and all steps', () => {
    render(<StepperProgress currentStep={3} />)
    expect(
      screen.getByText(`Шаг 3 из ${orderSteps.length}`)
    ).toBeInTheDocument()
  })
})
