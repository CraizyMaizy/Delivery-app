import { OrderReview } from '../components/OrderReview'
import { useOrderStore } from '../store/orderStore.ts'
import { useNavigate } from 'react-router-dom'
import { Check } from 'lucide-react'

export function OrderSuccess() {
  const navigate = useNavigate()
  const orderNumber = useOrderStore((state) => state.orderNumber)

  return (
    <div className="container mx-auto mt-6">
      <div className="max-w-4xl">
        <div className="flex flex-col mb-6">
          <div className="w-14 h-14 bg-green-500 rounded-full flex items-center justify-center mb-4">
            <Check className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-2xl font-bold">Заявка отправлена!</h1>
          <span className="text-gray-500 mt-1">
            Вы можете оплатить ваш заказ в разделе «Профиль»
          </span>
        </div>

        <OrderReview orderNumber={orderNumber ?? undefined} />

        <p className="text-sm text-gray-400 mt-4">
          Вся информация была продублирована в SMS
        </p>

        <div className="flex gap-3 mt-6">
          <button
            type="button"
            onClick={() => navigate('/profile/orders')}
            className="flex-1 bg-gray-100 rounded-xl py-3 hover:bg-gray-200 transition-colors"
          >
            Статус заявки
          </button>
          <button
            type="button"
            onClick={() => navigate('/')}
            className="flex-1 bg-black text-white rounded-xl py-3 hover:bg-gray-800 transition-colors"
          >
            На главную
          </button>
        </div>
      </div>
    </div>
  )
}
