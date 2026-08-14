import { useOrderStore } from '../store/orderStore'
import { useStepperNavigation } from '../hooks/useStepperNavigation'
import { OrderBreadcrumb } from '../components/OrderBreadcrumb'
import { StepperProgress } from '../components/StepperProgress'
import { OrderCard } from '../components/OrderCard'
import { useNavigate } from 'react-router-dom'

export function OrderStep6() {
  const navigate = useNavigate()
  const { goToNextStep } = useStepperNavigation(6)
  const payer = useOrderStore((state) => state.payer)
  const setPayer = useOrderStore((state) => state.setPayer)

  const handleNext = () => {
    if (!payer) return
    goToNextStep()
  }

  return (
    <div className="container mx-auto mt-6">
      <div className="grid grid-cols-[1fr_400px] gap-6 items-start">
        <div>
          <OrderBreadcrumb currentStep={6} />
          <h1 className="text-2xl font-bold mb-4">Оплата доставки</h1>

          <div className="mb-6">
            <StepperProgress currentStep={6} />
          </div>

          <div className="space-y-1 max-w-md">
            <h2 className="text-xl mb-4">Кто оплачивает доставку</h2>
            <label className={`flex items-center gap-3 p-2 cursor-pointer`}>
              <input
                type="radio"
                name="payer"
                value="sender"
                checked={payer === 'sender'}
                onChange={() => setPayer('sender')}
                className="w-4 h-4"
              />
              <span>Отправитель</span>
            </label>

            <label className={`flex items-center gap-3 p-2 cursor-pointer`}>
              <input
                type="radio"
                name="payer"
                value="receiver"
                checked={payer === 'receiver'}
                onChange={() => setPayer('receiver')}
                className="w-4 h-4"
              />
              <span>Получатель</span>
            </label>
          </div>

          <div className="flex max-w-md gap-3 pt-6">
            <button
              type="button"
              onClick={() => navigate(-1)}
              className="flex-1 bg-gray-100 rounded-xl py-3 hover:bg-gray-200 transition-colors"
            >
              Назад
            </button>
            <button
              type="button"
              onClick={handleNext}
              disabled={!payer}
              className="flex-1 bg-black text-white rounded-xl py-3 hover:bg-gray-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Продолжить
            </button>
          </div>
        </div>

        <OrderCard step={6} />
      </div>
    </div>
  )
}
