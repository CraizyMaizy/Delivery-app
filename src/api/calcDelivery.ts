import type { DeliveryOption } from '../types/delivery.ts'
import { api } from './axios.ts'

type CalculatePayload = {
  package: {
    length: number
    width: number
    height: number
    weight: number
  }
  senderPoint: {
    latitude: number
    longitude: number
  }
  receiverPoint: {
    latitude: number
    longitude: number
  }
}

type CalculateResponse = {
  success: boolean
  options: DeliveryOption[]
}

export const calculateDelivery = async (
  payload: CalculatePayload
): Promise<DeliveryOption[]> => {
  const { data } = await api.post<CalculateResponse>(
    '/api/v1/delivery/calc',
    payload
  )
  return data.options
}
