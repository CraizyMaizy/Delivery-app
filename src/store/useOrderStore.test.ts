import { describe, it, expect } from 'vitest'
import { useOrderStore } from './orderStore'
import {
  defaultOption,
  expressOption,
  envelope,
  moscow,
  spb,
  person,
  senderAddress,
  receiverAddress,
} from '../test/fixtures'

describe('useOrderStore', () => {
  it('empty in begin', () => {
    const state = useOrderStore.getState()
    expect(state.deliveryOptions).toEqual([])
    expect(state.selectedDeliveryOption).toBeNull
    expect(state.payer).toBeNull
    expect(state.sender).toBeNull
    expect(state.receiver).toBeNull
  })

  it('setCalculated save data', () => {
    useOrderStore.getState().setCalculatedData({
      fromPoint: moscow,
      toPoint: spb,
      parcelSize: envelope,
      deliveryOptions: [defaultOption, expressOption],
    })
    const state = useOrderStore.getState()
    expect(state.fromPoint).toEqual(moscow)
    expect(state.toPoint).toEqual(spb)
    expect(state.parcelSize).toEqual(envelope)
    expect(state.deliveryOptions).toHaveLength(2)
  })

  it('selectDeliveryOption dont change data', () => {
    useOrderStore.getState().setCalculatedData({
      fromPoint: moscow,
      toPoint: spb,
      parcelSize: envelope,
      deliveryOptions: [defaultOption, expressOption],
    })
    useOrderStore.getState().selectDeliveryOption(expressOption)
    const state = useOrderStore.getState()
    expect(state.selectedDeliveryOption).toEqual(expressOption)
    expect(state.fromPoint).toEqual(moscow)
    expect(state.deliveryOptions).toHaveLength(2)
  })

  it('sender and receiver saved regardless', () => {
    useOrderStore.getState().setReceiver(person)
    expect(useOrderStore.getState().receiver).toEqual(person)
    expect(useOrderStore.getState().sender).toBeNull()
  })

  it('sender address and receiver address saved regardless', () => {
    useOrderStore.getState().setSenderAddress(senderAddress)
    useOrderStore.getState().setReceiverAddress(receiverAddress)

    expect(useOrderStore.getState().receiverAddress).toEqual(receiverAddress)
    expect(useOrderStore.getState().senderAddress).toEqual(senderAddress)
  })

  it('save payer', () => {
    useOrderStore.getState().setPayer('receiver')
    expect(useOrderStore.getState().payer).toBe('receiver')
  })

  it('save order number', () => {
    useOrderStore.getState().setOrderNumber('zxc123')
    expect(useOrderStore.getState().orderNumber).toBe('zxc123')
  })
})
