import { useOrderStore } from '../store/orderStore'
import { formatPhone } from '../utils/formatPhone'

type Props = {
  orderNumber?: string
}

export function OrderReview({ orderNumber }: Props) {
  const selectedDeliveryOption = useOrderStore(
    (state) => state.selectedDeliveryOption
  )
  const fromPoint = useOrderStore((state) => state.fromPoint)
  const toPoint = useOrderStore((state) => state.toPoint)
  const senderAddress = useOrderStore((state) => state.senderAddress)
  const receiverAddress = useOrderStore((state) => state.receiverAddress)
  const sender = useOrderStore((state) => state.sender)
  const receiver = useOrderStore((state) => state.receiver)
  const payer = useOrderStore((state) => state.payer)

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Ваш заказ</h1>

      {orderNumber && (
        <div className="mb-6">
          <div className="text-sm text-gray-400">Номер заказа</div>
          <div className="text-xl font-bold">{orderNumber}</div>
        </div>
      )}

      <div className="grid grid-cols-2 gap-10">
        <div className="flex flex-col justify-between items-start gap-4">
          <div>
            <div className="text-sm text-gray-400 mb-1">Тип доставки</div>
            <div className="font-medium">{selectedDeliveryOption?.name}</div>
          </div>

          <div>
            <div className="text-sm text-gray-400 mb-1">Получатель</div>
            <div className="font-medium">
              {receiver?.lastname} {receiver?.firstname} {receiver?.middlename}
            </div>
            <div className="text-sm text-gray-500 mt-1">
              {formatPhone(receiver?.phone ?? '')}
            </div>
          </div>

          <div>
            <div className="text-sm text-gray-400 mb-1">Отправитель</div>
            <div className="font-medium">
              {sender?.lastname} {sender?.firstname} {sender?.middlename}
            </div>
            <div className="text-sm text-gray-500 mt-1">
              {formatPhone(sender?.phone ?? '')}
            </div>
          </div>
        </div>

        <div className="flex flex-col justify-between items-start gap-4">
          <div>
            <div className="text-sm text-gray-400 mb-1">Откуда забрать</div>
            <div className="font-medium">
              г. {fromPoint?.name}, ул. {senderAddress?.street}, д.{' '}
              {senderAddress?.house}, кв. {senderAddress?.apartment}
            </div>
          </div>

          <div>
            <div className="text-sm text-gray-400 mb-1">Куда доставить</div>
            <div className="font-medium">
              г. {toPoint?.name}, ул. {receiverAddress?.street}, д.{' '}
              {receiverAddress?.house}, кв. {receiverAddress?.apartment}
            </div>
          </div>

          <div>
            <div className="text-sm text-gray-400 mb-1">
              Кто оплачивает доставку
            </div>
            <div className="font-medium">
              {payer === 'sender' ? 'Отправитель' : 'Получатель'}
            </div>
          </div>
        </div>
      </div>

      {selectedDeliveryOption && (
        <h1 className="text-2xl font-bold mt-6">
          Итого: {(selectedDeliveryOption.price / 100).toLocaleString('ru-RU')}{' '}
          ₽
        </h1>
      )}
    </div>
  )
}
