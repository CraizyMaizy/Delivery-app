import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter, Route, Routes } from 'react-router-dom'
import { PersonForm } from './PersonForm'
import { useOrderStore } from '../store/orderStore'
import { person } from '../test/fixtures'

const renderForm = (
  role: 'sender' | 'receiver' = 'receiver',
  step = 2,
  title = 'Тестовая форма'
) =>
  render(
    <MemoryRouter initialEntries={[`/order/step-${step}`]}>
      <Routes>
        <Route
          path={`/order/step-${step}`}
          element={<PersonForm step={step} title={title} role={role} />}
        />
        <Route
          path={`/order/step-${step + 1}`}
          element={<div>Следующий шаг</div>}
        />
      </Routes>
    </MemoryRouter>
  )

const fillForm = async (user: ReturnType<typeof userEvent.setup>) => {
  await user.type(screen.getByPlaceholderText('Иванов'), 'Петров')
  await user.type(screen.getByPlaceholderText('Иван'), 'Пётр')
  await user.type(screen.getByPlaceholderText('Иванович'), 'Петрович')
  await user.type(screen.getByPlaceholderText('+7'), '+7 999 123 45 67')
}

describe('PersonForm', () => {
  it('displays errors if form is empty', async () => {
    const user = userEvent.setup()
    renderForm()

    await user.click(screen.getByRole('button', { name: 'Продолжить' }))

    expect(await screen.findByText('Введите фамилию')).toBeInTheDocument()
    expect(screen.getByText('Введите имя')).toBeInTheDocument()
    expect(screen.getByText('Введите отчество')).toBeInTheDocument()
    expect(screen.getByText('Введите корректный телефон')).toBeInTheDocument()
    expect(screen.queryByText('Следующий шаг')).not.toBeInTheDocument()
  })
  it('displays title from props', () => {
    renderForm('sender', 3, 'Отправитель')
    expect(
      screen.getByRole('heading', { level: 1, name: 'Отправитель' })
    ).toBeInTheDocument()
  })

  it('save receiver data and next step', async () => {
    const user = userEvent.setup()
    renderForm('receiver', 2)

    await fillForm(user)
    await user.click(screen.getByRole('button', { name: 'Продолжить' }))

    expect(await screen.findByText('Следующий шаг')).toBeInTheDocument()
    expect(useOrderStore.getState().receiver).toMatchObject({
      lastname: 'Петров',
      firstname: 'Пётр',
      middlename: 'Петрович',
    })
    expect(useOrderStore.getState().sender).toBeNull()
  })

  it('sender for sender not for receiver', async () => {
    const user = userEvent.setup()
    renderForm('sender', 3)

    await fillForm(user)
    await user.click(screen.getByRole('button', { name: 'Продолжить' }))

    expect(await screen.findByText('Следующий шаг')).toBeInTheDocument()
    expect(useOrderStore.getState().sender).toMatchObject({
      lastname: 'Петров',
    })
    expect(useOrderStore.getState().receiver).toBeNull()
  })

  it('set data before if return step', () => {
    useOrderStore.setState({ receiver: person })
    renderForm('receiver', 2)

    expect(screen.getByPlaceholderText('Иванов')).toHaveValue('Иванов')
    expect(screen.getByPlaceholderText('Иван')).toHaveValue('Иван')
  })
})
