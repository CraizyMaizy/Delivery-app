import { type PersonData, useOrderStore } from '../store/orderStore.ts'

type Props = {
  step: number
}

export function OrderCard({ step }: Props) {
  const selectedDeliveryOption = useOrderStore(
    (state) => state.selectedDeliveryOption
  )
  const receiver = useOrderStore((state) => state.receiver)
  const sender = useOrderStore((state) => state.sender)

  const formatPersonSummary = (person: PersonData | null) =>
    person ? `${person.lastName} ${person.firstName}` : 'Заполните поля'

  return (
    <div className="bg-gray-50 rounded-2xl p-6">
      <h2 className="text-xl font-bold mb-4">Ваш заказ</h2>

      <div className="mb-4">
        <div className="text-sm text-gray-400">Тип доставки</div>
        <div className="font-medium">
          {selectedDeliveryOption?.name ?? 'Не выбрано'}
        </div>
      </div>

      {step > 2 && (
        <div className="mb-4">
          <div className="text-sm text-gray-400">Получатель</div>
          <div className="font-medium">{formatPersonSummary(receiver)}</div>
        </div>
      )}

      {step > 3 && (
        <div>
          <div className="text-sm text-gray-400">Отправитель</div>
          <div className="font-medium">{formatPersonSummary(sender)}</div>
        </div>
      )}
    </div>
  )
}
