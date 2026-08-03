import { useMutation } from '@tanstack/react-query'
import { calculateDelivery } from '../api/calcDelivery.ts'

export const useCalculateDelivery = () => {
  return useMutation({
    mutationFn: calculateDelivery,
  })
}
