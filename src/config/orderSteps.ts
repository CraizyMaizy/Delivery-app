export type OrderStepConfig = {
  label: string
  path: string
}

export const orderSteps: OrderStepConfig[] = [
  { label: 'Тип доставки', path: '/order/step-1' },
  { label: 'Получатель', path: '/order/step-2' },
  { label: 'Отправитель', path: '/order/step-3' },
  { label: 'Откуда забрать', path: '/order/step-4' },
  { label: 'Куда доставить', path: '/order/step-5' },
  { label: 'Оплата доставки', path: '/order/step-6' },
  { label: 'Проверка данных', path: '/order/step-7' },
]

export const getNextStepPath = (currentStep: number): string | null => {
  const nextStep = orderSteps[currentStep]
  return nextStep ? nextStep.path : null
}
