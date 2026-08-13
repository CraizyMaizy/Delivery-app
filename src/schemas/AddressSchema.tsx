import { z } from 'zod'
export const AddressSchema = z.object({
  street: z.string().min(1, 'Введите улицу'),
  house: z.string().min(1, 'Введите номер дома'),
  flat: z.string().min(1, 'Введите номер квартиры'),
  leaveAtDoor: z.boolean(),
  noteForCourier: z.string().optional(),
})

export type AddressFormData = z.infer<typeof AddressSchema>
