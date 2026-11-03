import { z } from 'zod'
export const AddressSchema = z.object({
  street: z.string().min(1, 'Введите улицу'),
  house: z.string().min(1, 'Введите номер дома'),
  apartment: z.string().min(1, 'Введите номер квартиры'),
  isNonContact: z.boolean(),
  comment: z.string().optional(),
})

export type AddressFormData = z.infer<typeof AddressSchema>
