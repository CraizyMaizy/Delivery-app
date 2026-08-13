import { create } from 'zustand'
import type {
  DeliveryPoint,
  PackageSize,
  DeliveryOption,
} from '../types/delivery'

export type PersonData = {
  lastName: string
  firstName: string
  middleName: string
  phone: string
}

export type AddressData = {
  street: string
  house: string
  flat: string
  noteForCourier?: string
  leaveAtDoor: boolean
}

type CalculatedData = {
  fromPoint: DeliveryPoint
  toPoint: DeliveryPoint
  parcelSize: PackageSize
  deliveryOptions: DeliveryOption[]
}

type OrderState = {
  fromPoint: DeliveryPoint | null
  toPoint: DeliveryPoint | null
  parcelSize: PackageSize | null
  deliveryOptions: DeliveryOption[]
  selectedDeliveryOption: DeliveryOption | null
  setCalculatedData: (data: CalculatedData) => void
  selectDeliveryOption: (option: DeliveryOption) => void
  receiver: PersonData | null
  setReceiver: (data: PersonData) => void
  sender: PersonData | null
  setSender: (data: PersonData) => void
  receiverAddress: AddressData | null
  setReceiverAddress: (address: AddressData) => void
  senderAddress: AddressData | null
  setSenderAddress: (address: AddressData) => void
}

export const useOrderStore = create<OrderState>((set) => ({
  fromPoint: null,
  toPoint: null,
  parcelSize: null,
  deliveryOptions: [],
  selectedDeliveryOption: null,
  setCalculatedData: (data) => set(data), // обновляет фулл data
  selectDeliveryOption: (option) => set({ selectedDeliveryOption: option }), // меняет только одно поле ( поле выбора обыч/эксп)
  receiver: null,
  setReceiver: (data) => set({ receiver: data }),
  sender: null,
  setSender: (data) => set({ sender: data }),
  receiverAddress: null,
  setReceiverAddress: (address: AddressData) =>
    set({ receiverAddress: address }),
  senderAddress: null,
  setSenderAddress: (address: AddressData) => set({ senderAddress: address }),
}))
