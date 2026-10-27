import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter, Route, Routes } from 'react-router-dom'
import { OrderStep1 } from './OrderStep1'
import { useOrderStore } from '../store/orderStore'
import { defaultOption, expressOption } from '../test/fixtures'

const renderStep1 = () => {
  render(
    <MemoryRouter initialEntries={['/order/step-1']}>
      <Routes>
        <Route path="/order/step-1" element={<OrderStep1 />} />
        <Route path="/order/step-2" element={<div>Страница шага 2</div>} />
        <Route path="/" element={<div>Главная</div>} />
      </Routes>
    </MemoryRouter>
  )
}

describe('OrderStep1 page', () => {
  it('без расчёта просит сначала рассчитать доставку', () => {
    renderStep1()
    expect(
      screen.getByText('Сначала рассчитайте стоимость доставки')
    ).toBeInTheDocument()
  })

  it('display both types of delivery', () => {
    useOrderStore.setState({ deliveryOptions: [defaultOption, expressOption] })
    renderStep1()
    expect(
      screen.getByRole('button', { name: /Стандартная доставка/ })
    ).toBeInTheDocument()
    expect(
      screen.getByRole('button', { name: /Экспресс доставка/ })
    ).toBeInTheDocument()
  })

  it('on click save select and step 2', async () => {
    const user = userEvent.setup()
    useOrderStore.setState({ deliveryOptions: [defaultOption, expressOption] })
    renderStep1()
    await user.click(screen.getByRole('button', { name: /Экспресс доставка/ }))

    expect(useOrderStore.getState().selectedDeliveryOption).toEqual(
      expressOption
    )
    expect(screen.getByText('Страница шага 2')).toBeInTheDocument()
  })
})
