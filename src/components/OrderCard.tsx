import {
  type AddressData,
  type PersonData,
  useOrderStore,
} from '../store/orderStore.ts'

type Props = {
  step: number
}

export function OrderCard({ step }: Props) {
  const selectedDeliveryOption = useOrderStore(
    (state) => state.selectedDeliveryOption
  )
  const receiver = useOrderStore((state) => state.receiver)
  const sender = useOrderStore((state) => state.sender)

  const receiverAddress = useOrderStore((state) => state.receiverAddress)
  const senderAddress = useOrderStore((state) => state.senderAddress)

  const formatPersonSummary = (person: PersonData | null) =>
    person ? `${person.lastName} ${person.firstName}` : 'Заполните поля'

  const formatAddressSummary = (address: AddressData | null) =>
    address
      ? `${address.street} ${address.house} ${address.flat}`
      : 'Заполните поля'

  return (
    <div className="flex flex-col gap-3 bg-gray-50 rounded-2xl p-6">
      <h2 className="text-xl font-bold mb-4">Ваш заказ</h2>

      <div>
        <div className="text-sm text-gray-400">Тип доставки</div>
        <div className="font-medium">
          {selectedDeliveryOption?.name ?? 'Не выбрано'}
        </div>
      </div>

      {step > 2 && (
        <div>
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

      {step > 4 && (
        <div>
          <div className="text-sm text-gray-400">Откуда забрать</div>
          <div className="font-medium">
            {formatAddressSummary(senderAddress)}
          </div>
        </div>
      )}

      {step > 4 && (
        <div>
          <div className="text-sm text-gray-400">Куда доставить</div>
          <div className="font-medium">
            {formatAddressSummary(receiverAddress)}
          </div>
        </div>
      )}
      {receiverAddress?.leaveAtDoor && (
        // false = skip render by React, true = show right part
        <div>
          <div className="text-sm text-gray-400">Примечание</div>
          <div className="font-medium">Оставить заказ у двери</div>
        </div>
      )}
    </div>
  )
}
