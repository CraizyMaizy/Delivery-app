import { api } from './axios'
import type { CreateOrderPayload } from '../types/delivery.ts'

type CreateOrderResponse = {
  success: boolean
  reason: string
  order: {
    _id: string
    price: number
    status: string
    cancellable: boolean
  }
}

export const createOrder = async (
  payload: CreateOrderPayload
): Promise<string> => {
  const { data } = await api.post<CreateOrderResponse>(
    'api/v1/delivery/order',
    payload
  )
  return data.order._id
}
