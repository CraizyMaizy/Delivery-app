import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter, Route, Routes } from 'react-router-dom'
import { AddressForm } from './AddressForm'
import { useOrderStore } from '../store/orderStore'
import { senderAddress } from '../test/fixtures'

type Role = 'sender' | 'receiver'
type User = ReturnType<typeof userEvent.setup>

const renderForm = (role: Role = 'sender', step = 4) =>
  render(
    <MemoryRouter initialEntries={[`/order/step-${step}`]}>
      <Routes>
        <Route
          path={`/order/step-${step}`}
          element={
            <AddressForm step={step} title="Тестовый адрес" role={role} />
          }
        />
        <Route
          path={`/order/step-${step + 1}`}
          element={<div>Следующий шаг</div>}
        />
      </Routes>
    </MemoryRouter>
  )

const getField = (container: HTMLElement, name: string) =>
  container.querySelector<HTMLInputElement>(`input[name="${name}"]`)!

const fillRequired = async (user: User, container: HTMLElement) => {
  await user.type(getField(container, 'street'), 'Ленина')
  await user.type(getField(container, 'house'), '15')
  await user.type(getField(container, 'apartment'), '42')
}

describe('AddressForm', () => {
  describe('validate', () => {
    it('display errors if form is empty', async () => {
      const user = userEvent.setup()
      renderForm()

      await user.click(screen.getByRole('button', { name: 'Продолжить' }))

      expect(await screen.findByText('Введите улицу')).toBeInTheDocument()
      expect(screen.getByText('Введите номер дома')).toBeInTheDocument()
      expect(screen.getByText('Введите номер квартиры')).toBeInTheDocument()
      expect(screen.queryByText('Следующий шаг')).not.toBeInTheDocument()
    })

    it('comment for courier is optional', async () => {
      const user = userEvent.setup()
      const { container } = renderForm('sender', 4)

      await fillRequired(user, container)
      await user.click(screen.getByRole('button', { name: 'Продолжить' }))

      expect(await screen.findByText('Следующий шаг')).toBeInTheDocument()
    })
  })

  describe('save in store', () => {
    it('for sender save in senderAddress and next step', async () => {
      const user = userEvent.setup()
      const { container } = renderForm('sender', 4)

      await fillRequired(user, container)
      await user.click(screen.getByRole('button', { name: 'Продолжить' }))

      expect(await screen.findByText('Следующий шаг')).toBeInTheDocument()
      expect(useOrderStore.getState().senderAddress).toMatchObject({
        street: 'Ленина',
        house: '15',
        apartment: '42',
      })
      expect(useOrderStore.getState().receiverAddress).toBeNull()
    })
  })

  it('for receiver save in receiverAddress', async () => {
    const user = userEvent.setup()
    const { container } = renderForm('receiver', 5)

    await fillRequired(user, container)
    await user.click(screen.getByRole('button', { name: 'Продолжить' }))

    expect(await screen.findByText('Следующий шаг')).toBeInTheDocument()
    expect(useOrderStore.getState().receiverAddress).toMatchObject({
      street: 'Ленина',
    })
    expect(useOrderStore.getState().senderAddress).toBeNull()
  })

  it('save comment for courier', async () => {
    const user = userEvent.setup()
    const { container } = renderForm('sender', 4)

    await fillRequired(user, container)
    await user.type(getField(container, 'comment'), 'Домофон не работает')
    await user.click(screen.getByRole('button', { name: 'Продолжить' }))

    await screen.findByText('Следующий шаг')
    expect(useOrderStore.getState().senderAddress?.comment).toBe(
      'Домофон' + ' не работает'
    )
  })
  it('enter saved address if back step', () => {
    useOrderStore.setState({ senderAddress })
    const { container } = renderForm('sender', 4)

    expect(getField(container, 'street')).toHaveValue(senderAddress.street)
    expect(getField(container, 'house')).toHaveValue(senderAddress.house)
    expect(getField(container, 'apartment')).toHaveValue(
      senderAddress.apartment
    )
  })
})

describe('leave at the door', () => {
  it('receiver see checkbox', () => {
    renderForm('receiver', 5)
    expect(screen.getByRole('checkbox')).toBeInTheDocument()
  })
  it('sender does not see checkbox', () => {
    renderForm('sender', 4)
    expect(screen.queryByRole('checkbox')).not.toBeInTheDocument()
  })
  it('default false', async () => {
    const user = userEvent.setup()
    const { container } = renderForm('receiver', 5)

    await fillRequired(user, container)
    await user.click(screen.getByRole('button', { name: 'Продолжить' }))

    await screen.findByText('Следующий шаг')
    expect(useOrderStore.getState().receiverAddress?.isNonContact).toBe(false)
  })
  it('save if checked is true', async () => {
    const user = userEvent.setup()
    const { container } = renderForm('receiver', 5)

    await fillRequired(user, container)
    await user.click(screen.getByRole('checkbox'))
    await user.click(screen.getByRole('button', { name: 'Продолжить' }))

    await screen.findByText('Следующий шаг')
    expect(useOrderStore.getState().receiverAddress?.isNonContact).toBe(true)
  })
})

describe('navigation', () => {
  it('button back return back step', async () => {
    const user = userEvent.setup()
    render(
      <MemoryRouter
        initialEntries={['/order/step-1', '/order/step-2']}
        initialIndex={1}
      >
        <Routes>
          <Route path="/order/step-1" element={<div>Предыдущий шаг</div>} />
          <Route
            path="/order/step-2"
            element={<AddressForm step={4} title="Адрес" role="sender" />}
          />
        </Routes>
      </MemoryRouter>
    )
    await user.click(screen.getByRole('button', { name: 'Назад' }))
    expect(screen.getByText('Предыдущий шаг')).toBeInTheDocument()
  })
})
