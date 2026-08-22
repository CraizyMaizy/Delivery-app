import { useMutation } from '@tanstack/react-query'
import { createOrder } from '../api/createOrder.ts'

export const useCreateOrder = () => {
  return useMutation({
    mutationFn: createOrder,
  })
}
