import { useQuery } from '@tanstack/react-query'
import { getSize } from '../api/parcelSize.ts'

export const useParcelTypes = () => {
  return useQuery({
    queryKey: ['sizePackages'],
    queryFn: getSize,
    staleTime: 5 * 60 * 1000,
  })
}
