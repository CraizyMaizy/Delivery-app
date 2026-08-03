import { api } from './axios'
import type { ParcelType } from '../types/delivery.ts'

type ParcelTypeResponse = {
  success: boolean
  packages: ParcelType[]
}

export const getSize = async (): Promise<ParcelType[]> => {
  const { data } = await api.get<ParcelTypeResponse>(
    '/api/v1/delivery/package/types'
  )
  return data.packages
}
