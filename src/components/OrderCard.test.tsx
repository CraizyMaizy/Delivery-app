import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { OrderCard } from './OrderCard'
import { useOrderStore } from '../store/orderStore'
import {
  expressOption,
  moscow,
  spb,
  person,
  senderAddress,
  receiverAddress,
} from '../test/fixtures'

describe('OrderCard', () => {
  it('shows not selected', () => {
    render(<OrderCard step={1} />)
    expect(screen.getByText('Не выбрано')).toBeInTheDocument()
  })

  it('displays delivery name', () => {
    useOrderStore.setState({ selectedDeliveryOption: expressOption })
    render(<OrderCard step={1} />)
    expect(screen.getByText('Экспресс доставка')).toBeInTheDocument()
  })

  it.each([
    [2, 'Получатель', false],
    [3, 'Получатель', true],
    [3, 'Отправитель', false],
    [4, 'Отправитель', true],
    [4, 'Откуда забрать', false],
    [5, 'Откуда забрать', true],
    [5, 'Куда доставить', false],
    [6, 'Куда доставить', true],
    [6, 'Кто оплачивает доставку', false],
    [7, 'Кто оплачивает доставку', true],
  ])('on steps %i block "%s" shows: %s', (step, label, visible) => {
    render(<OrderCard step={step} />)

    const block = screen.queryByText(label)
    if (visible) {
      expect(block).toBeInTheDocument()
    } else {
      expect(block).not.toBeInTheDocument()
    }
  })

  it('display receiver name', () => {
    useOrderStore.setState({ receiver: person })
    render(<OrderCard step={3} />)
    expect(screen.getByText('Иванов Иван')).toBeInTheDocument()
  })

  it('takes receiver address instead of toPoint in func "Where to deliver"', () => {
    useOrderStore.setState({
      fromPoint: moscow,
      toPoint: spb,
      receiverAddress,
      senderAddress,
    })
    render(<OrderCard step={6} />)
    expect(
      screen.getByText('г. Москва, ул. Шелковичная, д. 12, кв. 5')
    ).toBeInTheDocument()
    expect(
      screen.getByText('г. Санкт-Петербург, ул. Невский проспект, д. 10, кв. 7')
    ).toBeInTheDocument()
  })

  it('display checkbox for NonContact', () => {
    useOrderStore.setState({
      receiverAddress: { ...receiverAddress, isNonContact: true },
    })
    render(<OrderCard step={1} />)
    expect(screen.getByText('Оставить заказ у двери')).toBeInTheDocument()
  })

  it('not display checkbox for NonContact', () => {
    useOrderStore.setState({
      receiverAddress: { ...receiverAddress, isNonContact: false },
    })
    render(<OrderCard step={1} />)
    expect(screen.queryByText('Оставить заказ у двери')).not.toBeInTheDocument()
  })
})
