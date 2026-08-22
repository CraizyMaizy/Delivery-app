import { z } from 'zod'
export const PersonSchema = z.object({
  lastname: z.string().min(1, 'Введите фамилию'),
  firstname: z.string().min(1, 'Введите имя'),
  middlename: z.string().min(1, 'Введите отчество'),
  phone: z.string().min(10, 'Введите корректный телефон'),
})
export type PersonFormData = z.infer<typeof PersonSchema>
