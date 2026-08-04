import { useNavigate } from 'react-router-dom'
import { useOrderStore } from '../store/orderStore.ts'

export function OrderStep1() {
  const navigate = useNavigate()
  const deliveryOptions = useOrderStore((state) => state.deliveryOptions)
  const selectedOption = useOrderStore((state) => state.selectedDeliveryOption)
  const selectDeliveryOption = useOrderStore(
    (state) => state.selectDeliveryOption
  )

  const handleNext = () => {
    if (!selectedOption) return
    navigate('/order/step-2')
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
    <div className="border rounded-2xl p-6 max-w-xl mx-auto mt-6">
      <h1 className="text-2xl font-bold mb-6">Выберите тип доставки</h1>

      <div className="space-y-3">
        {deliveryOptions.map((option) => (
          <button
            key={option.id}
            type="button"
            onClick={() => selectDeliveryOption(option)}
            className={`w-full border rounded-xl p-4 flex justify-between items-center transition-colors ${
              selectedOption?.id === option.id
                ? 'border-black bg-gray-50'
                : 'hover:border-gray-400'
            }`}
          >
            <div className="text-left">
              <div className="font-bold">{option.name}</div>
              <div className="text-gray-500 text-sm">~{option.days} дн.</div>
            </div>
            <div className="font-bold text-lg">
              {(option.price / 100).toLocaleString('ru-RU')} ₽
            </div>
          </button>
        ))}
      </div>
      <button
        type="button"
        onClick={handleNext}
        disabled={!selectedOption}
        className="w-full bg-black text-white rounded-xl py-3 mt-6 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        Далее →
      </button>
    </div>
  )
}
