import { z } from 'zod'
export const PersonSchema = z.object({
  lastName: z.string().min(1, 'Введите фамилию'),
  firstName: z.string().min(1, 'Введите имя'),
  middleName: z.string().min(1, 'Введите отчество'),
  phone: z.string().min(10, 'Введите корректный телефон'),
})
export type PersonFormData = z.infer<typeof PersonSchema>
