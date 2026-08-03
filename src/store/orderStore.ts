import { create } from 'zustand'
import type {
  DeliveryPoint,
  PackageSize,
  DeliveryOption,
} from '../types/delivery'

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
}

export const useOrderStore = create<OrderState>((set) => ({
  fromPoint: null,
  toPoint: null,
  parcelSize: null,
  deliveryOptions: [],
  selectedDeliveryOption: null,
  setCalculatedData: (data) => set(data), // обновляет фулл data
  selectDeliveryOption: (option) => set({ selectedDeliveryOption: option }), // меняет только одно поле ( поле выбора обыч/эксп)
}))
