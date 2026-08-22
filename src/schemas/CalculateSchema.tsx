import { z } from 'zod'

const packageSizeSchema = z.object({
  id: z.string().optional(),
  length: z.number().positive('Укажите длину'),
  width: z.number().positive('Укажите ширину'),
  height: z.number().positive('Укажите высоту'),
  weight: z.number().positive('Укажите вес'),
  name: z.string().optional(),
})

export const CalculateSchema = z
  .object({
    fromCity: z.string().min(1, 'Выберите город отправки'),
    toCity: z.string().min(1, 'Выберите город назначения'),
    parcelSize: packageSizeSchema.nullable().refine((v): boolean => v != null, {
      message: 'Укажите размер посылки',
    }),
  })
  .refine((data) => data.fromCity !== data.toCity, {
    message: 'Город отправки и назначения не должны совпадать',
    path: ['toCity'],
  })

export type CalculateFormData = z.infer<typeof CalculateSchema>
