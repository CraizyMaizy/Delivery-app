import { useQuery } from '@tanstack/react-query'
import { getPoints } from '../api/delivery.ts'

export const useDeliveryPoints = () => {
  return useQuery({
    queryKey: ['deliveryPoints'],
    queryFn: getPoints,
  })
}
