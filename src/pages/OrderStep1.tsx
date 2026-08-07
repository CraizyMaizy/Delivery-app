import { useNavigate } from 'react-router-dom'
import { useOrderStore } from '../store/orderStore.ts'
import type { DeliveryOption } from '../types/delivery.ts'
import banner_sale from '../assets/Banner-2.png'
import { Plane, BusFront } from 'lucide-react'
import { OrderBreadcrumb } from '../components/OrderBreadcrumb.tsx'
import { StepperProgress } from '../components/StepperProgress.tsx'
import { useStepperNavigation } from '../hooks/useStepperNavigation.ts'

export function OrderStep1() {
  const navigate = useNavigate()
  const deliveryOptions = useOrderStore((state) => state.deliveryOptions)
  const selectDeliveryOption = useOrderStore(
    (state) => state.selectDeliveryOption
  )

  const { goToNextStep } = useStepperNavigation(1)

  const handleSelectOption = (option: DeliveryOption) => {
    selectDeliveryOption(option)
    goToNextStep()
  }

  const getDeliveryIcon = (type: string) => {
    if (type === 'express') return <Plane className="w-6 h-6" />
    return <BusFront className="w-6 h-6" />
  }

  if (deliveryOptions.length === 0)
    return (
      <div className="text-center mt-10">
        <p>Сначала рассчитайте стоимость доставки</p>
        <button onClick={() => navigate('/')} className="underline mt-2">
          Вернуться на главную
        </button>
      </div>
    )

  return (
    <div className="container mx-auto mt-6">
      <div className="p-6 max-w-xl flex flex-col gap-y-2">
        <OrderBreadcrumb currentStep={1} />

        <h1 className="text-2xl font-bold mb-6">Способ отправки</h1>

        <StepperProgress currentStep={1} />

        <div className="space-y-3">
          {deliveryOptions.map((option) => (
            <button
              key={option.id}
              type="button"
              onClick={() => handleSelectOption(option)}
              className="w-full border rounded-xl p-4 flex justify-between items-center hover:border-gray-400 transition-colors"
            >
              <div className="flex items-center gap-3">
                {getDeliveryIcon(option.type)}
                <div className="text-left">
                  <div className="font-bold">{option.name}</div>
                  <div className="text-gray-500 text-sm">
                    ~{option.days} дн.
                  </div>
                </div>
              </div>
              <div className="font-bold text-lg">
                {(option.price / 100).toLocaleString('ru-RU')} ₽
              </div>
            </button>
          ))}
        </div>
        <img src={banner_sale} alt={banner_sale} className="mt-2" />
      </div>
    </div>
  )
}
