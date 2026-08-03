export type DeliveryPoint = {
  id: string
  name: string
  latitude: number
  longitude: number
}

export type ParcelType = {
  id: string
  name: string
  length: number
  width: number
  weight: number
  height: number
}

export type PackageSize = {
  length: number
  width: number
  weight: number
  height: number
  name?: string
}

export type DeliveryOption = {
  id: string
  name: string
  type: string
  price: number
  days: number
}
