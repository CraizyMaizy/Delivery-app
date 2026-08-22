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
  id?: string
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

export type CreateOrderPayload = {
  packageId: string
  optionType: string
  senderPointId: string
  senderAddress: {
    street: string
    house: string
    apartment: string
    comment?: string
  }
  sender: {
    firstname: string
    lastname: string
    middlename: string
    phone: string
  }
  receiverPointId: string
  receiverAddress: {
    street: string
    house: string
    apartment: string
    comment?: string
    isNonContact?: boolean
  }
  receiver: {
    firstname: string
    lastname: string
    middlename: string
    phone: string
  }
  payer: string
}
