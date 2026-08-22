import { useNavigate } from 'react-router-dom'
import { useOrderStore } from '../store/orderStore'
import { OrderBreadcrumb } from '../components/OrderBreadcrumb'
import { StepperProgress } from '../components/StepperProgress'
import { OrderReview } from '../components/OrderReview'

export function OrderStep7() {
  const navigate = useNavigate()
  const payer = useOrderStore((state) => state.payer)

  return (
    <div className="container mx-auto mt-6">
      <div className="max-w-4xl">
        <OrderBreadcrumb currentStep={7} />
        <h1 className="text-2xl font-bold mb-5">Проверка данных</h1>

        <div className="mb-6">
          <StepperProgress currentStep={7} />
        </div>

        <OrderReview />

        <button
          type="button"
          onClick={() => navigate('/order/step-2')}
          className="flex w-full items-center justify-center bg-gray-100 rounded-xl py-3 hover:bg-gray-200 transition-colors mt-4"
        >
          Редактировать данные
        </button>

        <div className="flex gap-3 pt-6">
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="flex-1 bg-gray-100 rounded-xl py-3 hover:bg-gray-200 transition-colors"
          >
            Назад
          </button>
          <button
            type="button"
            onClick={() => {}}
            disabled={!payer}
            className="flex-1 bg-black text-white rounded-xl py-3 hover:bg-gray-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Продолжить
          </button>
        </div>
      </div>
    </div>
  )
}
