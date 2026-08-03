import { api } from './axios'
import type { DeliveryPoint } from '../types/delivery.ts'

type DeliveryPointResponse = {
  success: boolean
  points: DeliveryPoint[]
}

export const getPoints = async (): Promise<DeliveryPoint[]> => {
  const { data } = await api.get<DeliveryPointResponse>(
    '/api/v1/delivery/points'
  )
  return data.points
}
