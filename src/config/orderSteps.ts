export type OrderStepConfig = {
  label: string
  path: string
}

export const orderSteps: OrderStepConfig[] = [
  { label: 'Тип доставки', path: '/order/step-1' },
  { label: 'Адрес отправителя', path: '/order/step-2' },
  { label: 'Адрес получателя', path: '/order/step-3' },
  { label: 'Данные отправителя', path: '/order/step-4' },
  { label: 'Данные получателя', path: '/order/step-5' },
  { label: 'Оплата', path: '/order/step-6' },
  { label: 'Подтверждение', path: '/order/step-7' },
]
