import {
  type AddressData,
  type PersonData,
  useOrderStore,
} from '../store/orderStore.ts'
import type { DeliveryPoint } from '../types/delivery.ts'

type Props = {
  step: number
}

export function OrderCard({ step }: Props) {
  const selectedDeliveryOption = useOrderStore(
    (state) => state.selectedDeliveryOption
  )
  const receiver = useOrderStore((state) => state.receiver)
  const sender = useOrderStore((state) => state.sender)
  const fromPoint = useOrderStore((state) => state.fromPoint)
  const toPoint = useOrderStore((state) => state.toPoint)

  const receiverAddress = useOrderStore((state) => state.receiverAddress)
  const senderAddress = useOrderStore((state) => state.senderAddress)

  const payer = useOrderStore((state) => state.payer)

  const formatPersonSummary = (person: PersonData | null) =>
    person ? `${person.lastname} ${person.firstname}` : 'Заполните поля'

  const formatAddressSummary = (
    address: AddressData | null,
    city: DeliveryPoint | null
  ) =>
    address
      ? `г. ${city?.name}, ул. ${address.street}, д. ${address.house}, кв. ${address.apartment}`
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
            {formatAddressSummary(senderAddress, fromPoint)}
          </div>
        </div>
      )}

      {step > 5 && (
        <div>
          <div className="text-sm text-gray-400">Куда доставить</div>
          <div className="font-medium">
            {formatAddressSummary(receiverAddress, toPoint)}
          </div>
        </div>
      )}
      {receiverAddress?.isNonContact && (
        // false = skip render by React, true = show right part
        <div>
          <div className="text-sm text-gray-400">Примечание</div>
          <div className="font-medium">Оставить заказ у двери</div>
        </div>
      )}
      {step > 6 && (
        <div>
          <div className="text-sm text-gray-400">Кто оплачивает доставку</div>
          <div className="font-medium">
            {payer === 'sender' ? 'Отправитель' : 'Получатель'}
          </div>
        </div>
      )}
    </div>
  )
}
