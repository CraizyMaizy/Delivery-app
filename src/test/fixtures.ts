import type {
  DeliveryOption,
  DeliveryPoint,
  PackageSize,
} from '../types/delivery'
import type { AddressData, PersonData } from '../store/orderStore'

export const moscow: DeliveryPoint = {
  id: '1',
  name: 'Москва',
  latitude: 55.7558,
  longitude: 37.6173,
}

export const spb: DeliveryPoint = {
  id: '2',
  name: 'Санкт-Петербург',
  latitude: 59.9343,
  longitude: 30.3351,
}

export const envelope: PackageSize = {
  id: 'envelope',
  name: 'Конверт',
  length: 42,
  width: 36,
  height: 5,
  weight: 2,
}

export const defaultOption: DeliveryOption = {
  id: 'opt-default',
  name: 'Стандартная доставка',
  type: 'default',
  price: 318150,
  days: 5,
}

export const expressOption: DeliveryOption = {
  id: 'opt-express',
  name: 'Экспресс доставка',
  type: 'express',
  price: 636300,
  days: 2,
}

export const person: PersonData = {
  lastname: 'Иванов',
  firstname: 'Иван',
  middlename: 'Иванович',
  phone: '+7 (999) 123-45-67',
}

export const senderAddress: AddressData = {
  street: 'Шелковичная',
  house: '12',
  apartment: '5',
  comment: '',
  isNonContact: false,
}

export const receiverAddress: AddressData = {
  street: 'Невский проспект',
  house: '10',
  apartment: '7',
  comment: '',
  isNonContact: true,
}
