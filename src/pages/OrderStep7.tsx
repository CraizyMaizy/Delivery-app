import { useNavigate } from 'react-router-dom'
import { useOrderStore } from '../store/orderStore'
import { OrderBreadcrumb } from '../components/OrderBreadcrumb'
import { StepperProgress } from '../components/StepperProgress'
import { formatPhone } from '../utils/formatPhone.ts'

export function OrderStep7() {
  const navigate = useNavigate()

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
    <div className="container mx-auto mt-6">
      <div className="max-w-4xl">
        <OrderBreadcrumb currentStep={7} />
        <h1 className="text-2xl font-bold mb-5">Проверка данных</h1>

        <div className="mb-6">
          <StepperProgress currentStep={7} />
        </div>

        <h1 className="text-2xl font-bold mb-4">Ваш заказ</h1>
        <div className="grid grid-cols-2 gap-10">
          <div className="flex flex-col justify-between items-start gap-4">
            <div>
              <div className="text-sm text-gray-400 mb-1">Тип доставки</div>
              <div className="font-medium">{selectedDeliveryOption?.name}</div>
            </div>

            <div>
              <div className="text-sm text-gray-400 mb-1">Получатель</div>
              <div className="font-medium">
                {receiver?.lastName} {receiver?.firstName}{' '}
                {receiver?.middleName},
              </div>
              <div className="text-sm text-gray-500 mt-1">
                {formatPhone(receiver?.phone ?? '')}
              </div>
            </div>

            <div>
              <div className="text-sm text-gray-400 mb-1 ">Отправитель</div>
              <div className="font-medium">
                {sender?.lastName} {sender?.firstName} {sender?.middleName},
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
                {senderAddress?.house}, кв. {senderAddress?.flat}
              </div>
            </div>

            <div>
              <div className="text-sm text-gray-400 mb-1">Куда доставить</div>
              <div className="font-medium">
                г. {toPoint?.name}, ул. {receiverAddress?.street}, д.{' '}
                {receiverAddress?.house}, кв. {receiverAddress?.flat}
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
            Итого:{' '}
            {(selectedDeliveryOption?.price / 100).toLocaleString('ru-RU')} ₽
          </h1>
        )}

        <button
          type="button"
          onClick={() => {
            navigate('/order/step-2')
          }}
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
